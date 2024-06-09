import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/users";

export const getUserBalance = async () => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/balance");
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};


export const getInvites = async () => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/invites");
    return response.data;
  } catch (error) {
    console.error("Error fetching from backend", error);
    throw error;
  }
};
