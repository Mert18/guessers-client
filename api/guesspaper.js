import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/guess-papers";

export const createGuessPaper = async (guessPaper) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/create", guessPaper);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const listRoomGuessPapersByStatus = async (filterParams, roomId, paging) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/list-by-status/room/" + roomId, filterParams, {
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
};


export const listSelfGuessPapers = async (listSelfGuessPaperRequest, paging) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/list-by-status/self", listSelfGuessPaperRequest, {
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
};