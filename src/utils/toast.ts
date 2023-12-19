import { toast } from "sonner";

type ToastOptions = {
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
};

export const asyncToast = (promise: Promise<any>, options?: ToastOptions) => {
  return new Promise((resolve, reject) => {
    toast.promise(promise, {
      loading: options?.loadingMessage || "Loading...",
      success: (data) => {
        resolve(data);
        return options?.successMessage || "Success!";
      },
      error: (err) => {
        reject(err);
        return options?.errorMessage || err.message
      },
    });
  });
};
