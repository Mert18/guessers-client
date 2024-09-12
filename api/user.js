import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/users";

export const getProfile = async (username) => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/" + username);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};


export const getInvites = async () => {
  const localAxios = await axiosInstance();
  try {
    const response = await localAxios.get(baseURL + "/invites");
    return response.data;
  } catch (error) {
    
    throw error;
  }
};
