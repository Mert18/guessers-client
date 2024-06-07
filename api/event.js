import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URI + '/api/events';

export const getUserBalance = async (username) => {
   return await axios.get(baseURL + '/balance/' + username);
}

export const getEvents = async (paging) => {
    return await axios.post(baseURL + "/list", paging);
}