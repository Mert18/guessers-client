import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/rooms";

export const getUserRooms = async () => {
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
}

export const isOwner = async (roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + roomId + "/owner");
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}

export const invitePeople = async (request) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/invite", request);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}

export const acceptRoomInvite = async (roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + roomId + "/accept");
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}

export const rejectRoomInvite = async (roomId) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + roomId + "/reject");
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
}