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

export type SingleDocumentResponse = {
  $type: string;
  Result: DocumentData;
  IsSuccessStatusCode: boolean;
  Message: string | null;
  ReasonPhrase: string | null;
  StatusCode: number;
  ValidationResults: any;
  IsCachedResult: boolean;
};

export type DocumentResponse = {
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

export type GeneralLookupQuery = {
  Code: string;
  Description: string;
};

export type QueryDefinition = {
  $type: string;
  Result: {
    $type: string;
    Document: {
      $type: string;
      Data: {
        $type: string;
        $value: string;
      };
      UpdateInfo: {
        $type: string;
        CreatedBy: string;
        CreatedOn: string;
        UpdatedBy: string;
        UpdatedOn: string;
      };
      Description: string;
      DocumentId: string;
      DocumentVersionId: string;
      DocumentTypeId: string;
      Name: string;
      AlternateName: string;
      Path: string;
      Status: string;
    };
    Parameters: {
      $type: string;
      $values: {
        $type: string;
        Operation: number;
        PropertyName: string;
        Prompt: string;
        AllowMultiple?: boolean;
        Values: {
          $type: string;
          $values: never[];
        };
      }[];
    };
    Path: string;
    Properties: {
      $type: string;
      $values: {
        $type: string;
        QuerySourceId?: string; // will be undefined if it is SQL, should ignore this when looping through properties?
        Name: string;
        PropertyName: string;
        Alias: string;
        Caption: string;
        DisplayFormat: string;
        DisplayOrder: number;
        Link: string;
        DataTypeName: string;
      }[];
    };
    Relations: {
      $type: string;
      $values: {
        $type: string;
        LeftQuerySourceId: string;
        LeftPropertyName: string;
        RightQuerySourceId: string;
        RightPropertyName: string;
        RelationType: string;
      }[];
    };
    Sources: {
      $type: string;
      $values: {
        $type: string;
        QuerySourceId: string;
        QuerySourceType: number;
        Name: string;
        Description: string;
        BusinessControllerName: string;
      }[];
    };
    QueryDefinitionId: string;
  };
  IsSuccessStatusCode: boolean;
  Message: null;
  ReasonPhrase: null;
  StatusCode: number;
  ValidationResults: {
    $type: string;
    Errors: {
      $type: string;
      $values: never[];
    };
    Warnings: {
      $type: string;
      $values: never[];
    };
  };
  IsCachedResult: boolean;
};

export type FileTypes =
  | "7Z"
  | "APC"
  | "APP"
  | "ATH"
  | "AVI"
  | "BMP"
  | "BOD"
  | "BUS"
  | "CFL"
  | "COM"
  | "CON"
  | "COP"
  | "CTY"
  | "DBB"
  | "DBO"
  | "DBS"
  | "DMG"
  | "DOC"
  | "EML"
  | "EPUB"
  | "EX0"
  | "EX2"
  | "EX3"
  | "EX4"
  | "EX5"
  | "EXM"
  | "EXP"
  | "FOL"
  | "GIF"
  | "HTM"
  | "ICO"
  | "ICS"
  | "IQD"
  | "JPE"
  | "JPG"
  | "LAY"
  | "MEA"
  | "MEP"
  | "MID"
  | "MOBI"
  | "MOV"
  | "MP2"
  | "MP3"
  | "MP4"
  | "MPE"
  | "MPG"
  | "MSG"
  | "NAV"
  | "OP2"
  | "OPP"
  | "PDF"
  | "PNG"
  | "POS"
  | "PPT"
  | "RCT"
  | "RDL"
  | "RES"
  | "RFA"
  | "RFM"
  | "RSP"
  | "RTF"
  | "SLP"
  | "SPE"
  | "SRT"
  | "SVG"
  | "TCT"
  | "TIF"
  | "TXT"
  | "VTT"
  | "WAV"
  | "WEB"
  | "WEBP"
  | "WFD"
  | "WMV"
  | "WSL"
  | "WST"
  | "XLS"
  | "XML"
  | "XPE"
  | "ZIP";

