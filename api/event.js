import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/events";

export const getEvents = async (paging) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/list", paging);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};
