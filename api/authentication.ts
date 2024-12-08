import axios from "axios";
import { toast } from "react-toastify";
import { IUserRegister } from "../types/IUser.model";

const baseURLAuthentication =
  process.env.NEXT_PUBLIC_BACKEND_URI + "/api/authentication";

export const createUser = async (user: IUserRegister) => {
  return await axios
    .post(baseURLAuthentication + "/create-user", user)
    .then(() => {
      toast.success("User created successfully.");
    })
    .catch((err) => {
      toast.error("Error creating user. " + err?.response?.data?.message);
    });
};

export const getStats = async () => {
  return await axios.get(baseURLAuthentication + "/stats");
};
