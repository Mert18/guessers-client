import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/prizes";

export const getRoomPrizes = async (roomId, paging, active) => {
  const localAxios = await axiosInstance();
  try {
    const url = baseURL + "/list/" + roomId;
    const response = await localAxios.get(url, {
      params: {
        page: paging.page,
        size: paging.size,
        active: active
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPrize = async (createPrizeRequest, roomId) => {
  const localAxios = await axiosInstance();
  try {
    const url = baseURL + "/create/" + roomId;
    const response = await localAxios.post(url, createPrizeRequest);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const buyPrize = async (prizeId) => {
  const localAxios = await axiosInstance();
  try {
    const url = baseURL + "/buy/" + prizeId;
    const response = await localAxios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
