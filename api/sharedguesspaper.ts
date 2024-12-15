import axios from "axios";
import { axiosInstance } from "./base";

const baseURL =
  process.env.NEXT_PUBLIC_BACKEND_URI + "/api/shared-guess-papers";

export const shareGuessPaper = async (guessPaperId: string) => {
  const response = await axiosInstance.get(baseURL + "/share/" + guessPaperId);
  return response?.data;
};

export const getSharedGuessPaper = async (token: string) => {
  return await axios.get(baseURL + "/getByToken/" + token);
};
