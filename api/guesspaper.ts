import { ICreateGuessPaper, IListRoomGuessPapersByStatus } from "../types/IGuessPaper.model";
import { IPaging } from "../types/IRequest.model";
import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/guess-papers";

export const createGuessPaper = async (guessPaper: ICreateGuessPaper) => {
    const response = await axiosInstance.post(baseURL + "/create", guessPaper);
    return response?.data;
  
};

export const listRoomGuessPapersByStatus = async ({roomId, paging}: IListRoomGuessPapersByStatus) => {
  
    const response = await axiosInstance.get(
      baseURL + "/list-by-status/room/" + roomId,
      {
        params: {
          page: paging.page,
          size: paging.size,
        },
      }
    );
    return response?.data;
  
};

export const listSelfGuessPapers = async (paging: IPaging) => {
  
    const response = await axiosInstance.get(baseURL + "/list-by-status/self", {
      params: {
        page: paging.page,
        size: paging.size,
      },
    });
    return response?.data;
};
