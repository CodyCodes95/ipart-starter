import { ContactData, QueryResponse } from "../types/api";

//Helper Functions

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

const getTotalQueryRecordCount = async (query:string) => {
  const res = await api.query(query, undefined, 1);
  return res.TotalCount
  }

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
        endpoint: `${import.meta.env.VITE_ENDPOINT}/api/${endpoint}`,
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
    if (method === "DELETE") {
      return res
    }
    const data = await res.json();
    return data;
  }
};

export const api = {
  get: {
    one: async <T>(
      endpoint: string,
      id: string | number,
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
    allAndMutate: async<T>(
      endpoint: string,
      mutate: (data: T[], i: number) => Promise<void>,
      limit: number = 100
    ) => {
      const getCount = await api.get.many(endpoint, undefined, 1);
      const totalCount = getCount.TotalCount
      for (const i of Array(Math.ceil(totalCount / limit)).keys()) {
        const res = await api.get.many<T>(endpoint, undefined, limit, i * limit);
        await mutate(res.Items.$values, i);
      }
      return
    },
  },
  query: async <T>(
    query: string,
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
    queryAll: async <T>(
    query: string,
    ) => {
      const totalCount = await getTotalQueryRecordCount(query)
      const data: T[] = []
      for (const i of Array(Math.ceil(totalCount / 100)).keys()) {
        const res = await api.query<T>(query, undefined, 100, i * 100)
        data.push(...res.Items.$values)
      }
    return data
  },
  queryAllAndMutate: async <T>(query: string, mutate:
    (data: T[], i: number) => Promise<void>  
    , limit: number = 100) => {
    const totalCount = await getTotalQueryRecordCount(query);
    for (const i of Array(Math.ceil(totalCount / limit)).keys()) {
      const res = await api.query<T>(query, undefined, limit, i * limit);
      await mutate(res.Items.$values, i);
    }
    return
  },
  post: {
    contact: async <T>(
      endpoint: string,
      id: string | number,
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
    properties: async <T>(
      endpoint: string,
      id: string | number,
      updatedProperties: {
        [key: string]:
          | string
          | number
          | null
          | boolean
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
  delete: async (endpoint: string, id: string | number, ordinal?: number) => {
    const res = await imisFetch(
      `${endpoint}/${!ordinal ? `${id}` : `~${id}|${ordinal}`}`,
      "DELETE"
    );
    return res;
  },
};