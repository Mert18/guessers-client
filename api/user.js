import { axiosInstance } from "./base";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + "/api/users";

export const getProfile = async (username) => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/" + username);
    return response.data;
  } catch (error) {
    
    throw error;
  }
};


export const getInvites = async () => {
  
  try {
    const response = await axiosInstance.get(baseURL + "/invites");
    return response.data;
  } catch (error) {
    
    throw error;
  }
};
