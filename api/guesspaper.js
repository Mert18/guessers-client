import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/guess-papers";

export const createGuessPaper = async (guessPaper) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/create", guessPaper);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const listRoomGuessPapersByStatus = async (roomId, paging) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(
      baseURL + "/list-by-status/room/" + roomId,
      {
        params: {
          page: paging.page,
          size: paging.size,
        },
      }
    );
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const listSelfGuessPapers = async (paging) => {
  const localAxios = await axiosInstance();
  if (!localAxios) {
    return; // prevent further execution
  }
  try {
    const response = await localAxios.get(baseURL + "/list-by-status/self", {
      params: {
        page: paging.page,
        size: paging.size,
      },
    });
    return response.data;
  } catch (error) {
    
    throw error;
  }
};
