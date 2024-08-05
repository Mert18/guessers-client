import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/rooms";

export const getRoom = async (roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + roomId);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const listSelfRooms = async () => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/list/self");
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const createRoom = async (room) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/create", room);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const invitePeople = async (request, roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(
      baseURL + "/" + roomId + "/invite",
      request
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const acceptRoomInvite = async (roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + roomId + "/accept");
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const rejectRoomInvite = async (roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + roomId + "/reject");
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const getRanks = async (roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + roomId + "/ranks");
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const listPublicRooms = async (paging) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/list/public", {
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

export const joinPublicRoom = async (roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + roomId + "/join");
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const searchRoom = async (query, paging) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/search", {
      params: {
        page: paging.page,
        size: paging.size,
        query: query,
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};

export const getRoomUser = async (roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + roomId + "/self");
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}