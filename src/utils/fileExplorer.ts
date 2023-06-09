import { imisFetch } from "../api/api";
import {
  DecendantFilesResult,
  DocumentData,
  FileTypes,
} from "../types/imisTypes";

export const getDecendantFiles = async (
  folderId: string,
  fileTypes?: FileTypes[]
) => {
  const data = await imisFetch("/api/DocumentSummary/_execute", "POST", {
    $type: "Asi.Soa.Core.DataContracts.GenericExecuteRequest, Asi.Contracts",
    EntityTypeName: "DocumentSummary",
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
          $values: fileTypes || ["JPG", "PNG", "CON", "IQD", "FOL", "CFL"],
        },
        {
          $type: "System.Boolean",
          $value: false,
        },
      ],
    },
  });
  return data as DecendantFilesResult;
};

export const getDecendantFolders = async (folderId: string) => {
  const data = await imisFetch("/api/DocumentSummary/_execute", "POST", {
    $type: "Asi.Soa.Core.DataContracts.GenericExecuteRequest, Asi.Contracts",
    EntityTypeName: "DocumentSummary",
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
          $values: ["FOL", "CFL"],
        },
        {
          $type: "System.Boolean",
          $value: false,
        },
      ],
    },
  });
  return data;
};

export const getFolderByPath = async (path: string) => {
  const data = await imisFetch("/api/DocumentSummary/_execute", "POST", {
    $type: "Asi.Soa.Core.DataContracts.GenericExecuteRequest, Asi.Contracts",
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
  return data.Result;
};

export const getDocumentByVersionId = async (versionId: string) => {
  const data = await imisFetch("/api/DocumentSummary/_execute", "POST", {
    $type: "Asi.Soa.Core.DataContracts.GenericExecuteRequest, Asi.Contracts",
    EntityTypeName: "DocumentSummary",
    OperationName: "FindByVersionId",
    Parameters: {
      $type:
        "System.Collections.ObjectModel.Collection`1[[System.Object, mscorlib]], mscorlib",
      $values: [
        {
          $type: "System.String",
          $value: versionId,
        },
      ],
    },
  });
  return data.Result as DocumentData;
};
