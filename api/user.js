import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + '/api/user';

export const getUserBalance = async (name) => {
   return await axios.post(baseURL + '/balance', {
    name
   });
}

export const getUserOwnedItems = async (user) =>  {
   return await axios.get(baseURL + '/owned-items?user=' + user);
}