import React, { useEffect } from 'react'
import FadeInOut from '../common/FadeInOut';

const SixthStep = ({ handleCreateUser }) => {
   const handleLogin = () => {

   }

   useEffect(() => {
   }, [])
 
   return (
     <FadeInOut>
         <h1>You are created!</h1>

         <div>
            <p>Name:</p>
            <p className='scale-125'>-USERNAME-</p>
         </div>
         <div>
            <p>Password:</p>
            <p className='scale-125'>-PASSWORD-</p>
         </div>
         <div>
            <button onClick={handleLogin}>Login</button>
         </div>
     </FadeInOut>
   );
 };
 
 export default SixthStep;