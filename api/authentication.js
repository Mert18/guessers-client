import axios from "axios";
import { toast } from "react-toastify";

const baseURLAuthentication =
  process.env.NEXT_PUBLIC_BACKEND_URI + "/api/authentication";

export const createUser = async (user) => {
  return await axios
    .post(baseURLAuthentication + "/create-user", user)
    .then((response) => {
      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success("User created successfully.");
      }
    })
    .catch(() => {
      toast.error("An error occurred.");
    });
};

export const getStats = async () => {
  return await axios.get(baseURLAuthentication + "/stats");
};
