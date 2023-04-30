import { ServerSchema } from "../types/apiTypes";
import { party } from "./routes";


export const api: ServerSchema = {
  party: party,
};
