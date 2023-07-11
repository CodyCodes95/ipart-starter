import api from "@codythatsme/caus-api";
import {
  DecendantFilesResult,
  DocumentData,
  FileTypes,
} from "../types/imisTypes";

export const getDecendantFiles = async (
  folderId: string,
  fileTypes?: FileTypes[]
) => {
  const data = await api.post.any<DecendantFilesResult>(
    "DocumentSummary/_execute",
    {
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
    }
  );
  return data;
};

export const getDecendantFolders = async (folderId: string) => {
  const data = await api.post.any("/api/DocumentSummary/_execute", {
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
  const data = await api.post.any<{ Result: DocumentData }>(
    "/api/DocumentSummary/_execute",
    {
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
    }
  );
  return data.Result;
};

export const getDocumentByVersionId = async (versionId: string) => {
  const data = await api.post.any<{ Result: DocumentData }>(
    "/api/DocumentSummary/_execute",
    {
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
    }
  );
  return data.Result;
};
