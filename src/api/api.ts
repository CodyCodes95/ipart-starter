import createApi from "@codythatsme/caus-api";

const apiOptions = import.meta.env.PROD
  ? undefined
  : {
      baseUrl: "http://localhost:9000",
      username: import.meta.env.VITE_USERNAME as string,
      password: import.meta.env.VITE_PASSWORD as string,
    };

export const api = createApi(apiOptions);
