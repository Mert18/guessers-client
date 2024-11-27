import { IPaging } from "@/types/IRequest.model";
import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/users";

export const getProfile = async (username: string) => {
  const response = await axiosInstance.get(baseURL + "/" + username);
  return response?.data;
};

export const getInvites = async (paging: IPaging) => {
  const response = await axiosInstance.get(baseURL + "/invites", {
    params: {
      page: paging?.page,
      size: paging?.size,
    },
  });
  return response?.data;
};
