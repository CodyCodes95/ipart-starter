import { ContactData, QueryResponse } from "../types/api";
import { DecendantFilesResult } from "../types/imisTypes";

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
      return res;
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
    allAndMutate: async <T>(
      endpoint: string,
      mutate: (data: T[], i: number) => Promise<void>,
      limit: number = 100
    ) => {
      const getCount = await api.get.many(endpoint, undefined, 1);
      const totalCount = getCount.TotalCount;
      for (const i of Array(Math.ceil(totalCount / limit)).keys()) {
        const res = await api.get.many<T>(
          endpoint,
          undefined,
          limit,
          i * limit
        );
        await mutate(res.Items.$values, i);
      }
      return;
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
    parameters?: { [key: string]: string | number }
  ) => {
    const totalCountRes = await api.query(query, parameters, 1);
    const totalCount = totalCountRes.TotalCount;
    const data: T[] = [];
    for (const i of Array(Math.ceil(totalCount / 100)).keys()) {
      const res = await api.query<T>(query, undefined, 100, i * 100);
      data.push(...res.Items.$values);
    }
    return data;
  },
  queryAllAndMutate: async <T>(
    query: string,
    mutate: (data: T[], i: number) => Promise<void>,
    parameters?: { [key: string]: string | number },
    limit: number = 100
  ) => {
    const totalCountRes = await api.query(query, parameters, 1);
    const totalCount = totalCountRes.TotalCount;
    if (!totalCount) return;
    for (const i of Array(Math.ceil(totalCount / limit)).keys()) {
      const res = await api.query<T>(query, parameters, limit, i * limit);
      await mutate(res.Items.$values, i);
    }
    return;
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
    standalone: async <T>(
      endpoint: string,
      data: { [key: string]: string | number }
    ) => {
      const res = await imisFetch(`${endpoint}`, "POST", {
        $type: "Asi.Soa.Core.DataContracts.GenericEntityData, Asi.Contracts",
        EntityTypeName: endpoint,
        PrimaryParentEntityTypeName: "Standalone",
        Identity: {
          $type: "Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts",
          EntityTypeName: endpoint,
        },
        PrimaryParentIdentity: {
          $type: "Asi.Soa.Core.DataContracts.IdentityData, Asi.Contracts",
          EntityTypeName: "Standalone",
        },
        Properties: {
          $type:
            "Asi.Soa.Core.DataContracts.GenericPropertyDataCollection, Asi.Contracts",
          $values: Object.entries(data).map(([key, value]) => ({
            $type:
              "Asi.Soa.Core.DataContracts.GenericPropertyData, Asi.Contracts",
            Name: key,
            Value: value,
          })),
        },
      });
      return res;
    },
    any: async <T>(endpoint: string, data: any) => {
      const res = await imisFetch(`${endpoint}`, "POST", data);
      return res;
    },
  },
  put: {
    properties: async <T>(
      endpoint: string,
      id: string | number,
      updatedProperties: {
        [key: string]: string | number | null | boolean;
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
  delete: async (
    endpoint: string,
    id: string | number,
    ordinal?: number | string
  ) => {
    const res = await imisFetch(
      `${endpoint}/${!ordinal ? `${id}` : `~${id}|${ordinal}`}`,
      "DELETE"
    );
    return res;
  },
  document: {
    getDocumentId: async (path: string) => {
      const res = await api.post.any("DocumentSummary/_execute", {
        $type:
          "Asi.Soa.Core.DataContracts.GenericExecuteRequest, Asi.Contracts",
        EntityTypeName: "DocumentSummary",
        OperationName: "FindByPath",
        Parameters: {
          $type:
            "System.Collections.ObjectModel.Collection`1[[System.Object, mscorlib]], mscorlib",
          $values: [
            {
              $type: "System.String",
              $value: path,
            },
          ],
        },
      });
      return res.Result.Path;
    },
    getAllByFolderPath: async (folderPath: string, blob: boolean = false) => {
      let endpoint = "";
      if (blob) {
        endpoint = "Document";
      } else {
        endpoint = "DocumentSummary";
      }
      const folderId = await api.document.getDocumentId(folderPath);
      const res = await api.post.any(`${endpoint}/_execute`, {
        $type:
          "Asi.Soa.Core.DataContracts.GenericExecuteRequest, Asi.Contracts",
        EntityTypeName: endpoint,
        OperationName: "FindDocumentsInFolder",
        Parameters: {
          $type:
            "System.Collections.ObjectModel.Collection`1[[System.Object, mscorlib]], mscorlib",
          $values: [
            {
              $type: "System.String",
              $value: folderId,
            },
            {
              $type: "System.String[]",
              $values: ["JPG", "PNG", "CON", "IQD", "FOL", "CFL"],
            },
            {
              $type: "System.Boolean",
              $value: false,
            },
          ],
        },
      });
      return res as DecendantFilesResult;
    },
  },
  gentable: {
    create: async (table: string, code: string) => {
      const res = await api.post.any("gentable", {
        $type: "Asi.Soa.Core.DataContracts.GenTableData, Asi.Contracts",
        Table_Name: table,
        Code: code,
        Upper_Code: code.toUpperCase(),
        Description: code,
        NCode: code,
      });
      return res;
    },
  },
};

//formdesignerlibrary
