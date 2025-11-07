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

export const banUsername = async (username: string) => {
  return await axios
    .post(baseURLAuthentication + "/ban-username", { username: username })
    .then(() => {
      toast.error(`Username "${username}" is now banned. You were unlucky! Try again with a different username.`);
    })
    .catch((err) => {
      toast.error("Error banning username. " + err?.response?.data?.message);
    });
};

export const checkUsername = async (username: string) => {
  return await axios
    .get(baseURLAuthentication + "/check-username/" + username)
    .then((res) => res.data)
    .catch((err) => {
      toast.error("Error checking username. " + err?.response?.data?.message);
      throw err;
    });
};

export const getStats = async () => {
  return await axios.get(baseURLAuthentication + "/stats");
};
