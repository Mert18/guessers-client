import {
  ICreateEvent,
  IFinalizeEvent,
  IGetActiveEvents,
  IGetCompletedEvents,
  IStartEvent,
} from "../types/IEvent.model";
import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/events";

export const getActiveEvents = async ({ roomId, paging }: IGetActiveEvents) => {
  const url = baseURL + "/list/" + roomId + "/active";
  const response = await axiosInstance.get(url, {
    params: {
      page: paging.page,
      size: paging.size,
    },
  });
  return response?.data;
};

export const getCompletedEvents = async ({
  roomId,
  paging,
}: IGetCompletedEvents) => {
  const url = baseURL + "/list/" + roomId + "/completed";
  const response = await axiosInstance.get(url, {
    params: {
      page: paging.page,
      size: paging.size,
    },
  });
  return response?.data;
};

export const getEvent = async (eventId: string) => {
  const response = await axiosInstance.get(baseURL + "/" + eventId);
  return response?.data;
};

export const createEvent = async ({ event, roomId }: ICreateEvent) => {
  const response = await axiosInstance.post(
    baseURL + "/create" + "/" + roomId,
    event
  );
  return response?.data;
};

export const startEvent = async ({ eventId, roomId }: IStartEvent) => {
  const response = await axiosInstance.get(
    baseURL + "/" + eventId + "/start/" + roomId
  );
  return response?.data;
};

export const finalizeEvent = async ({
  request,
  eventId,
  roomId,
}: IFinalizeEvent) => {
  const response = await axiosInstance.post(
    baseURL + "/" + eventId + "/finalize/" + roomId,
    request
  );
  return response?.data;
};
