import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/ready-events";

export const getReadyEvents = async (league: number) => {
  const url = baseURL + "/upcoming/" + league;
  const response = await axiosInstance.get(url);
  return response?.data;
};
