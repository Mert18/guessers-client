import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/events";

export const getActiveEvents = async (roomId, paging) => {
  const localAxios = await axiosInstance();
  try {
    const url = baseURL + "/list/" + roomId + "/active";
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

export const getCompletedEvents = async (roomId, paging) => {
  const localAxios = await axiosInstance();
  try {
    const url = baseURL + "/list/" + roomId + "/completed";
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

export const createEventFromReadyEvent = async (roomId, readyEventId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/create/" + roomId + "/" + readyEventId);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}


export const startEvent = async (eventId, roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + eventId + "/start/" + roomId);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}

export const finalizeEvent = async (request, eventId, roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/" + eventId + "/finalize/" + roomId, request);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}
