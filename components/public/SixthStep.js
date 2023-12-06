import React from 'react'
import FadeInOut from '../common/FadeInOut';

const SixthStep = ({ createdUser }) => {
 
   const handleRedirectLogin = () => {

   }
   
   return (
     <FadeInOut>
         <h1>You are created!</h1>

         <div>
            <p>Name:</p>
            <p className='scale-125'>{createdUser.name}</p>
         </div>
         <div>
            <p>Identity Number:</p>
            <p className='scale-125'>{createdUser.identityNumber}</p>
         </div>
         <div>
            <button onClick={() => handleRedirectLogin()}>Login</button>
         </div>
     </FadeInOut>
   );
 };
 
 export default SixthStep;