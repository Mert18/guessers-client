import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/events";

export const getEvents = async (request) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/list/" + request.roomId, {}, {
      params: request.paging,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

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
