import { AxiosError } from "axios";
import { toast } from "sonner";

// Returns true if project is running in dev env
export const in_dev_env = !!process && process.env.NODE_ENV === "development";

export const renderErrorToast = (
  title: string,
  message: string,
  duration: number = 1000
) => {
  toast.error(title, {
    description: message,
    duration,
  });
};

export const handleErrorResponse = (error: AxiosError) => {
  let err_code = error?.response?.status;

  switch (err_code) {
    case 429:
      renderErrorToast("Too many requests!", "Please try after 60 seconds");
      return;
    default:
      console.log("error", error);
      return;
  }
};
