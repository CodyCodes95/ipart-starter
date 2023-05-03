export type QueryResponse<T> = {
  $type: string;
  Items: {
    $type: string;
    $values: T[];
  };
  Offset: number;
  Limit: number;
  Count: number;
  TotalCount: number;
  NextPageLink: null;
  HasNext: boolean;
  NextOffset: number;
};

export type ContentItem<T> = {
  $type: string;
  Items: {
    $type: string;
    $values: {
      $type: string;
      Data: {
        $type: string;
        ContentKey: string;
        ContentTypeKey: string;
        ContentItemKey: string;
        ShowTitleFlag: boolean;
        SortOrder: number;
        LayoutZone: number;
        ContentItemName: string;
        IconUrl: null;
        Settings: T[];
        PartTitle: null;
        PartTitleHeadingLevel: number;
        DoNotRenderInDesignMode: boolean;
        CssClass: null;
        ShowBorder: boolean;
        Collapsible: boolean;
        Collapsed: boolean;
        DisplayOnExtraSmallScreens: boolean;
        DisplayOnSmallScreens: boolean;
        DisplayOnMediumScreens: boolean;
        DisplayOnLargeScreens: boolean;
        ModuleSpecificSetting: null;
        LicenseKeyRestriction: null;
      };
    }[];
  };
  Offset: number;
  Limit: number;
  Count: number;
  TotalCount: number;
  NextPageLink: null;
  HasNext: boolean;
  NextOffset: number;
};