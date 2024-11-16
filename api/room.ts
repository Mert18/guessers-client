import { IPaging } from "../types/IRequest.model";
import {
  ICreateRoom,
  IGiveTokenToUser,
  IInvitePeople,
  ISearchRoom,
} from "../types/IRoom.model";
import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/rooms";

export const getRoom = async (roomId: string) => {
  const response = await axiosInstance.get(baseURL + "/" + roomId);
  return response.data;
};

export const listSelfRooms = async (paging: IPaging) => {
  const response = await axiosInstance.get(baseURL + "/list/self", {
    params: {
      page: paging?.page,
      size: paging?.size,
    },
  });
  return response?.data;
};

export const createRoom = async (room: ICreateRoom) => {
  const response = await axiosInstance.post(baseURL + "/create", room);
  return response.data;
};

export const invitePeople = async ({
  invitedUsername,
  roomId,
}: IInvitePeople) => {
  const response = await axiosInstance.get(
    baseURL + "/" + roomId + "/invite/" + invitedUsername
  );
  return response.data;
};

export const acceptRoomInvite = async (roomId: string) => {
  const response = await axiosInstance.get(baseURL + "/" + roomId + "/accept");
  return response.data;
};

export const rejectRoomInvite = async (roomId: string) => {
  const response = await axiosInstance.get(baseURL + "/" + roomId + "/reject");
  return response.data;
};

export const getRanks = async (roomId: string) => {
  const response = await axiosInstance.get(baseURL + "/" + roomId + "/ranks");
  return response.data;
};

export const listPublicRooms = async (paging: IPaging) => {
  const response = await axiosInstance.get(baseURL + "/list/public", {
    params: {
      page: paging.page,
      size: paging.size,
    },
  });
  return response.data;
};

export const joinPublicRoom = async (roomId: string) => {
  const response = await axiosInstance.get(baseURL + "/" + roomId + "/join");
  return response.data;
};

export const searchRoom = async ({ query, paging }: ISearchRoom) => {
  const response = await axiosInstance.get(baseURL + "/search", {
    params: {
      page: paging.page,
      size: paging.size,
      query: query,
    },
  });
  return response.data;
};

export const getRoomUser = async (roomId: string) => {
  const response = await axiosInstance.get(baseURL + "/" + roomId + "/self");
  return response.data;
};

export const fetchRoomUsers = async (roomId: string) => {
  const response = await axiosInstance.get(baseURL + "/" + roomId + "/users");
  return response.data;
};

export const giveTokenToUsers = async ({roomId, roomUserIds, amount}: IGiveTokenToUser) => {
  await axiosInstance.get(
    baseURL +
      "/" +
      roomId +
      "/give-token?roomUserIds=" +
      roomUserIds.join(",") +
      "&amount=" +
      amount
  );
};
