import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/guess-papers";

export const createGuessPaper = async (guessPaper) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.post(baseURL + "/create", guessPaper);
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};
