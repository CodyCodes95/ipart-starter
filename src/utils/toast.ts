import toast from "react-hot-toast";

export const showSuccess = (message: string, id?: string) => {
  if (id) {
    toast.success(message, { id });
  } else {
    toast.success(message);
  }
};

export const showError = (message: string, id?: string) => {
    if (id) {
        toast.error(message, { id });
    } else {
        toast.error(message);
    }
}
    