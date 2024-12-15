import { getAccessToken } from "../util/sessionTokenAccessor";
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
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
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
    if (
      error.response?.data?.message != undefined ||
      error.response?.data?.message != null
    ) {
      toast.error("An error occured." + error.response?.data?.message);
    }
  }
);
