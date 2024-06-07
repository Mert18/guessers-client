import axios from 'axios';

const baseURLAuthentication = process.env.NEXT_PUBLIC_BACKEND_URI + '/api/authentication';

export const createUser = async (user) => {
   return await axios.post(baseURLAuthentication + '/create-user', user);
}