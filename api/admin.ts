import { axiosInstance } from "./base";

const baseURLAuthentication =
  process.env.NEXT_PUBLIC_BACKEND_URI + "/api/admin";

export const readyEvents = async (league: number) => {
  return await axiosInstance.get(
    baseURLAuthentication + "/ready-events?league=" + league
  );
};

export const readyEventLeagues = async () => {
  return await axiosInstance.get(baseURLAuthentication + "/ready-events/leagues");
};
