import { getAccessToken } from "@/util/sessionTokenAccessor";
import axios from "axios";

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

  return instance;
};
