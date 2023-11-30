import axios from 'axios';

export const generateUser = async (request) => {
   await axios.get(NEXT_PUBLIC_BACKEND_URI + '/api/public', {
      request
   }).then((response) => {
      console.log("Response: ", response)
      return response;
   }).catch((error) => {
      console.log("Error: ", error)
      return error;
   });
   return response.data;
}