import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/events";

export const getEvents = async (roomId, paging) => {
  console.log("halooo 1: ", roomId, paging);
  const localAxios = await axiosInstance();
  console.log("halooo 2: ", roomId, paging);
  try {
    const url = baseURL + "/list/" + roomId;
    console.log("URL: ", url);
    const response = await localAxios.get(url, {
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

export const getEvent = async (eventId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + eventId);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const createEvent = async (event, roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/create" + "/" + roomId, event);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}


export const startEvent = async (eventId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/start/" + eventId);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}

export const finalizeEvent = async (request) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/finalize", request);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}
