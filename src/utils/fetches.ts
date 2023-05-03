const buildRequest = (method: string, body: any) => {
  if (body) {
    return {
      method: method,
      headers: {
        RequestVerificationToken: document.querySelector<any>(
          "#__RequestVerificationToken"
        ).value,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    };
  } else {
    return {
      method: method,
      headers: {
        RequestVerificationToken: document.querySelector<any>(
          "#__RequestVerificationToken"
        ).value,
        "Content-type": "application/json",
      },
    };
  }
};

export const imisFetch = async (
  endpoint: string,
  method: string,
  body?: any
) => {
  if (
    window.location.origin.includes("localhost") ||
    window.location.origin.includes("127.")
  ) {
    const res = await fetch("https://imis-bridge-production.up.railway.app", {
      method: "POST",
      body: JSON.stringify({
        endpoint: `${import.meta.env.VITE_ENDPOINT}${endpoint}`,
        method: method,
        body: body,
        username: import.meta.env.VITE_USERNAME,
        password: import.meta.env.VITE_PASSWORD,
      }),
    });
    const data = await res.json();
    return data;
  } else {
    const res = await fetch(`/api/${endpoint}`, buildRequest(method, body));
    const data = await res.json();
    return data;
  }
};

export const api = {
  get: async <T>(
    endpoint: string,
    parameters?: { [key: string]: string | number }[],
    offset: number = 0,
    limit: number = 100
  ): Promise<T> => {
    const params = new URLSearchParams();
    params.append("offset", offset.toString());
    params.append("limit", limit.toString());
    if (parameters) {
      Object.entries(parameters).forEach(([key, value]) => {
        params.append(key, value.toString());
      });
    }
    const res = await imisFetch(`${endpoint}?${params.toString()}`, "GET");
    return res;
  },
  query: async <T>(
    query: string,
    parameters?: { [key: string]: string | number }[],
    offset: number = 0,
    limit: number = 100
  ):Promise<T> => {
    const params = new URLSearchParams();
    params.append("offset", offset.toString());
    params.append("limit", limit.toString());
    if (parameters) {
      Object.entries(parameters).forEach(([key, value]) => {
        params.append(key, value.toString());
      });
    }
    const res = await imisFetch(`query/${query}?${params.toString()}`, "GET");
    return res;
  },
};
