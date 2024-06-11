import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/bet-slips";

export const placeBet = async (betslip) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/create", betslip);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const getRoomBetSlips = async (roomId, paging) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/list/room/" + roomId, {
      params: {
        page: paging.page,
        size: paging.size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}

export const checkBetSlips = async (roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/check/room/"+ roomId);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}