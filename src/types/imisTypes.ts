export type DocumentData = {
  $type: string;
  Description: string;
  DocumentId: string;
  DocumentVersionId: string;
  DocumentTypeId: FileTypes;
  Name: string;
  AlternateName: string;
  Path: string;
  Status: string;
};

export type ResponseData = {
  $type: string;
  Result: {
    $type: string;
    $values: DocumentData[];
  };
  IsSuccessStatusCode: boolean;
  Message: string | null;
  ReasonPhrase: string | null;
  StatusCode: number;
  ValidationResults: any;
  IsCachedResult: boolean;
};

export type DocumentSearch = {
  $type: string;
  Description: null;
  Name: string;
  DocumentPath: string;
  CreatedOn: string;
  DocumentKey: string;
  DocumentTypeId: FileTypes;
  UpdatedOn: string;
  UpdatedByUserKey: string;
  DocumentId: string;
};

export type DecendantFilesResult = {
  Result: {
    $values: DocumentData[];
  };
};

export type FileTypes = "FOL" | "CON" | "PNG" | "IQD" | "JPG" | "CFL";
