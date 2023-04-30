import { ApiMethods } from "../api/baseApi";

export type Party = {
  FirstName: string;
  LastName: string;
  id: string;
};

export type ServerSchema = {
  party: ApiMethods<Party>;
};
