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
