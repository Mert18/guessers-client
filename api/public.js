import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + '/api/public';

export const createUser = async (wantedName, wantedDollars) => {
   return await axios.post(baseURL + '/create-user', {
      wantedName,
      wantedDollars
   });
}