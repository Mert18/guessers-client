import axios from 'axios';

export const createUser = async (wantedName, wantedDollars) => {
   await axios.post(process.env.NEXT_PUBLIC_BACKEND_URI + '/api/public/create-user', {
      wantedName,
      wantedDollars
   }).then((response) => {
      console.log("Response: ", response)
      return response;
   }).catch((error) => {
      console.log("Error: ", error)
      return error;
   });
}