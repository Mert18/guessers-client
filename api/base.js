import { getAccessToken } from "@/util/sessionTokenAccessor";
import axios from "axios";
import { toast } from "react-toastify";

// Create axios instance synchronously
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URI,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.error("Error in request interceptor", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response?.data?.showNotification) {
      toast.info(response?.data?.message);
    }
    return response;
  },
  (error) => {
    console.error("Error in Axios response:", error);
    toast.error("An error occurred.");
    return Promise.reject(error);
  }
);
