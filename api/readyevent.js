import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/ready-events";

export const getReadyEvents = async (league) => {
    const localAxios = await axiosInstance();
    try {
      const url = baseURL + "/upcoming/" + league;
      const response = await localAxios.get(url);
      return response.data;
    } catch (error) {
      
      throw error;
    }
  }