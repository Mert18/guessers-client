import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + '/api/users';

export const getUserBalance = async (username) => {
   return await axios.get(baseURL + '/balance/' + username);
}