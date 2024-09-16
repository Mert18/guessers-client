import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/events";

export const getActiveEvents = async (roomId, paging) => {
  try {
    const url = baseURL + "/list/" + roomId + "/active";
    const response = await axiosInstance.get(url, {
      params: {
        page: paging.page,
        size: paging.size,
      },
    });
    return response.data;
  } catch (error) {
    
    throw error;
  }
}

export const getCompletedEvents = async (roomId, paging) => {Z
  try {
    const url = baseURL + "/list/" + roomId + "/completed";
    const response = await axiosInstance.get(url, {
      params: {
        page: paging.page,
        size: paging.size,
      },
    });
    return response.data;
  } catch (error) {
    
    throw error;
  }
}

export const getEvent = async (eventId) => {
  try {
    const response = await axiosInstance.get(baseURL + "/" + eventId);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const createEvent = async (event, roomId) => {
  try {
    const response = await axiosInstance.post(baseURL + "/create" + "/" + roomId, event);
    return response.data;
  } catch (error) {
    
    throw error;
  }
}

export const createEventFromReadyEvent = async (roomId, readyEventIds) => {
  try {
    const response = await axiosInstance.get(baseURL + "/create/" + roomId + "?readyEventIds=" + readyEventIds.join(","));
    return response.data;
  } catch (error) {
    
    throw error;
  }
}


export const startEvent = async (eventId, roomId) => {
  try {
    const response = await axiosInstance.get(baseURL + "/" + eventId + "/start/" + roomId);
    return response.data;
  } catch (error) {
    
    throw error;
  }
}

export const finalizeEvent = async (request, eventId, roomId) => {
  try {
    const response = await axiosInstance.post(baseURL + "/" + eventId + "/finalize/" + roomId, request);
    return response.data;
  } catch (error) {
    
    throw error;
  }
}
