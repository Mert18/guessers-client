import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/rooms";

export const getRoom = async (roomId) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/" + roomId);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const listSelfRooms = async (paging) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/list/self", {
      params: {
        page: paging?.page,
        size: paging?.size,
      },
    });
    return response?.data;
  } catch (error) {
    
    throw error;
  }
};

export const createRoom = async (room) => {
  
  try {
    const response = await axiosInstance.post(baseURL + "/create", room);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const invitePeople = async (invitedUsername, roomId) => {
  
  try {
    const response = await axiosInstance.get(
      baseURL + "/" + roomId + "/invite/" + invitedUsername
    );
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const acceptRoomInvite = async (roomId) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/" + roomId + "/accept");
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const rejectRoomInvite = async (roomId) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/" + roomId + "/reject");
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getRanks = async (roomId) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/" + roomId + "/ranks");
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const listPublicRooms = async (paging) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/list/public", {
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

export const joinPublicRoom = async (roomId) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/" + roomId + "/join");
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const searchRoom = async (query, paging) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/search", {
      params: {
        page: paging.page,
        size: paging.size,
        query: query,
      },
    });
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const getRoomUser = async (roomId) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/" + roomId + "/self");
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const fetchRoomUsers = async (roomId) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/" + roomId + "/users");
    return response.data;
  } catch (error) {
    
    throw error;
  }
};

export const giveTokenToUsers = async (roomId, roomUserIds, amount) => {
  
  try {
    await axiosInstance.get(baseURL + "/" + roomId + "/give-token?roomUserIds=" + roomUserIds.join(",") + "&amount=" + amount);
  } catch (error) {
    
    throw error;
  }
};
