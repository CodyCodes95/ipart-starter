import { ContactData, QueryResponse } from "../types/api";

const buildRequest = (method: string, body: any) => {
  if (body) {
    return {
      method: method,
      headers: {
        RequestVerificationToken: document.querySelector<any>(
          "#__RequestVerificationToken"
        ).value,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };
  } else {
    return {
      method: method,
      headers: {
        RequestVerificationToken: document.querySelector<any>(
          "#__RequestVerificationToken"
        ).value,
        "Content-type": "application/json",
      },
    };
  }
};

export const imisFetch = async (
  endpoint: string,
  method: string,
  body?: any
) => {
  if (
    window.location.origin.includes("localhost") ||
    window.location.origin.includes("127.")
  ) {
    const res = await fetch("https://imis-bridge-production.up.railway.app", {
      method: "POST",
      body: JSON.stringify({
        endpoint: `${import.meta.env.VITE_ENDPOINT}${endpoint}`,
        method: method,
        body: body,
        username: import.meta.env.VITE_USERNAME,
        password: import.meta.env.VITE_PASSWORD,
      }),
    });
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(`/api/${endpoint}`, buildRequest(method, body));
    const data = await res.json();
    return data;
  }
};

export const api = {
  get: {
    one: async <T>(
      endpoint: string,
      id: string,
      ordinal?: number
    ): Promise<T> => {
      const res = await imisFetch(
        `${endpoint}/${!ordinal ? `${id}` : `~${id}|${ordinal}`}`,
        "GET"
      );
      return res;
    },
    many: async <T>(
      endpoint: string,
      // endpoint: Endpoints,
      parameters?: { [key: string]: string | number }[],
      limit: number = 100,
      offset: number = 0
    ) => {
      const params = new URLSearchParams();
      params.append("offset", offset.toString());
      params.append("limit", limit.toString());
      if (parameters) {
        Object.entries(parameters).forEach(([key, value]) => {
          params.append(key, value.toString());
        });
      }
      const res = await imisFetch(
        `${endpoint}${params ? `?${params.toString()}` : ""}`,
        "GET"
      );
      return res as QueryResponse<T>;
    },
  },
  query: async <T>(
    query: string,
    // query: Endpoints,
    parameters?: { [key: string]: string | number },
    limit: number = 100,
    offset: number = 0
  ) => {
    const params = new URLSearchParams();
    params.append("offset", offset.toString());
    params.append("limit", limit.toString());
    if (parameters) {
      Object.entries(parameters).forEach(([key, value]) => {
        params.append(key, value.toString());
      });
    }
    const res = await imisFetch(
      `query?queryname=${query}&${params.toString()}`,
      "GET"
    );
    // return res as T;
    return res as QueryResponse<T>;
  },
  post: {
    contact: async <T>(
      endpoint: string,
      id: string,
      data?: { [key: string]: string | number },
      idKey: string = "ID"
    ) => {
      const bodyData: { [key: string]: string | number }[] = [
        {
          $type:
            "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
          Name: idKey,
          Value: id,
        },
      ];
      if (data) {
        Object.entries(data).forEach(([key, value]) => {
          bodyData.push({
            $type:
              "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
            Name: key,
            Value: value,
          });
        });
      }

      const res = await imisFetch(`${endpoint}`, "POST", {
        $type: "Asi.Soa.Core.DataContracts.GenericEntityData, Asi.Contracts",
        EntityTypeName: endpoint,
        PrimaryParentEntityTypeName: "Party",
        Identity: {
          $type: "Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts",
          EntityTypeName: endpoint,
        },
        PrimaryParentIdentity: {
          $type: "Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts",
          EntityTypeName: "Party",
          IdentityElements: {
            $type:
              "System.Collections.ObjectModel.Collection`1[[System.String, mscorlib]], mscorlib",
            $values: [id],
          },
        },
        Properties: {
          $type:
            "Asi.Soa.Core.DataContracts.GenericPropertyDataCollection, Asi.Contracts",
          $values: bodyData,
        },
      });
      return res;
    },
    standalone: async <T>(endpoint: string, data: any) => {
      const res = await imisFetch(`${endpoint}`, "POST", data);
      return res;
    },
  },
  put: {
    contact: async <T>(
      endpoint: string,
      id: string,
      updatedProperties: {
        [key: string]:
          | string
          | number
          | null
          | {
              $type: string;
              $value: string | boolean;
            };
      },
      ordinal?: number
    ) => {
      const data = await api.get.one<ContactData>(endpoint, id, ordinal);
      Object.entries(updatedProperties).forEach(([key, value]) => {
        const property = data.Properties.$values.find(
          (prop) => prop.Name === key
        );
        if (property) {
          property.Value = value;
        }
      });
      const res = await imisFetch(
        `${endpoint}/${!ordinal ? `${id}` : `~${id}|${ordinal}`}`,
        "PUT",
        data
      );
      return res;
    },
  },
  delete: async (endpoint: string, id: string, ordinal?: number) => {
    const res = await imisFetch(
      `${endpoint}/${!ordinal ? `${id}` : `~${id}|${ordinal}`}`,
      "DELETE"
    );
    return res;
  },
};
