import { Party } from "../types/apiTypes";
import { createBaseApi } from "./baseApi";

const endpoint = "/party"
export const party = createBaseApi<Party>(endpoint);
