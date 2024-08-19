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

export const listRoomGuessPapersByStatus = async (roomId, paging) => {
  console.log("starting")
  const localAxios = await axiosInstance();
  console.log("axios instance created")
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
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const listSelfGuessPapers = async (paging) => {
  const localAxios = await axiosInstance();
  if (!localAxios) {
    console.error("Failed to create Axios instance. No request will be sent.");
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
    console.error("Error fetching from backend", error);
    throw error;
  }
};
