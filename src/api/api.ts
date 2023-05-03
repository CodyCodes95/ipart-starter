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
      offset: number = 0,
      limit: number = 100
    ): Promise<T> => {
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
      return res;
    },
  },
  query: async <T>(
    query: string,
    // query: Endpoints,
    parameters?: { [key: string]: string | number },
    offset: number = 0,
    limit: number = 100
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
    single: async <T>(endpoint: string, id:string, data: any[]) => {
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
          $values: [
            {
              $type:
                "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
              Name: "ID",
              Value: id,
            },
            ...data
          ],
        },
      });
      return res;
    }
  },
  put: {
    contact: async <T>(
      endpoint: string,
      id: string,
      updatedProperties: T[],
      ordinal?: number
    ) => {
      const oldData = await api.get.one<ContactData>(endpoint, id, ordinal);
      const newData = {
        ...oldData,
        Properties: {
          $values: [
            ...oldData.Properties.$values,
            ...Object.entries(updatedProperties).map(([key, value]) => {
              return {
                Name: key,
                Value: value,
              };
            }),
          ],
        },
      };
      const res = await imisFetch(
        `${endpoint}/${!ordinal ? `${id}` : `~${id}|${ordinal}`}`,
        "PUT",
        newData
      );
      return res;
    },
  },
};
