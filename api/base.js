import { getAccessToken } from "@/util/sessionTokenAccessor";
import axios from "axios";
import { toast } from "react-toastify";

export const axiosInstance = async () => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error("No access token found");
    return null;
  }

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URI, // Your backend base URL
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  instance.interceptors.response.use(
    (response) => {
      if(response?.data?.showNotification) {
        toast.info(response?.data?.message);
      }
      return response;
    },
    () => {
      toast.error('An error occurred.');
    }
  );

  return instance;
};
