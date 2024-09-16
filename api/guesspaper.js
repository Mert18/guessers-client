import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/guess-papers";

export const createGuessPaper = async (guessPaper) => {
  
  try {
    const response = await axiosInstance.post(baseURL + "/create", guessPaper);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const listRoomGuessPapersByStatus = async (roomId, paging) => {
  
  try {
    const response = await axiosInstance.get(
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
  
  if (!localAxios) {
    return; // prevent further execution
  }
  try {
    const response = await axiosInstance.get(baseURL + "/list-by-status/self", {
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
