import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/bet-slips";

export const placeBet = async (betslip) => {
  
  try {
    const response = await axiosInstance.post(baseURL + "/create", betslip);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getRoomBetSlips = async (roomId, paging) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/list/room/" + roomId, {
      params: {
        page: paging.page,
        size: paging.size,
      },
    });
    return response.data;
  } catch (error) {
    
    throw error;
  }
}

export const getSelfBetSlips = async (paging) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/list/self", {
      params: {
        page: paging.page,
        size: paging.size,
      },
    });
    return response.data;
  } catch (error) {
    
    throw error;
  }
}