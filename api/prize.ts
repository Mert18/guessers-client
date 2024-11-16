import { ICreatePrize, IGetRoomPrizes } from "../types/IPrize.model";
import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/prizes";

export const getRoomPrizes = async ({
  roomId,
  paging,
  active,
}: IGetRoomPrizes) => {
  const url = baseURL + "/list/" + roomId;
  const response = await axiosInstance.get(url, {
    params: {
      page: paging.page,
      size: paging.size,
      active: active,
    },
  });
  return response.data;
};

export const createPrize = async ({
  createPrizeRequest,
  roomId,
}: ICreatePrize) => {
  const url = baseURL + "/create/" + roomId;
  const response = await axiosInstance.post(url, createPrizeRequest);
  return response.data;
};

export const buyPrize = async (prizeId: string) => {
  const url = baseURL + "/buy/" + prizeId;
  const response = await axiosInstance.get(url);
  return response.data;
};
