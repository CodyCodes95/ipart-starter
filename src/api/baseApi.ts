type Params = Record<string, any>;

type Callback<T> = (response: T) => void;
type ErrorCallback = (error: Error | string) => void;

export type ApiMethods<T> = {
  findUnique: (
    params: Params,
    onSuccess: Callback<T | null>,
    onError: ErrorCallback
  ) => void;
  findMany: (
    params: Params,
    onSuccess: Callback<T[]>,
    onError: ErrorCallback
  ) => void;
  update: (
    params: Params,
    data: Partial<T>,
    onSuccess: Callback<T>,
    onError: ErrorCallback
  ) => void;
  create: (data: T, onSuccess: Callback<T>, onError: ErrorCallback) => void;
  delete: (
    params: Params,
    onSuccess: Callback<T>,
    onError: ErrorCallback
  ) => void;
};

function fetchWrapper<T>(
  endpoint: string,
  url: string,
  options: RequestInit,
  onSuccess: Callback<T>,
  onError: ErrorCallback
): Promise<T> {
  return fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    })
    .then((data) => {
      onSuccess(data);
      return data;
    })
    .catch((error) => {
      onError(error);
      throw error;
    });
}

export function createBaseApi<T>(endpoint: string): ApiMethods<T> {
  return {
    findUnique(params, onSuccess, onError) {
      fetchWrapper<T>(
        endpoint,
        `${endpoint}/${params.id}`,
        {},
        onSuccess,
        onError
      );
    },
    findMany(params, onSuccess, onError) {
      fetchWrapper<T[]>(
        endpoint,
        endpoint,
        {
          method: "POST",
          body: JSON.stringify(params),
        },
        onSuccess,
        onError
      );
    },
    update(params, data, onSuccess, onError) {
      fetchWrapper<T>(
        endpoint,
        `${endpoint}/${params.id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        },
        onSuccess,
        onError
      );
    },
    create(data, onSuccess, onError) {
      fetchWrapper<T>(
        endpoint,
        endpoint,
        {
          method: "POST",
          body: JSON.stringify(data),
        },
        onSuccess,
        onError
      );
    },
    delete(params, onSuccess, onError) {
      fetchWrapper<T>(
        endpoint,
        `${endpoint}/${params.id}`,
        {
          method: "DELETE",
        },
        onSuccess,
        onError
      );
    },
  };
}
