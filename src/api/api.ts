import createApi from "@codythatsme/caus-api";

const apiOptions = import.meta.env.PROD
  ? undefined
  : {
      baseUrl: "http://localhost:9000",
      username: import.meta.env.VITE_USERNAME,
      password: import.meta.env.VITE_PASSWORD,
    };

export const api = createApi(apiOptions);
