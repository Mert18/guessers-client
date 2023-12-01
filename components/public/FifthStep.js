import React, { useEffect } from 'react'
import FadeInOut from '../common/FadeInOut';


const FifthStep = ({ setCurrentStep, handleCreateUser }) => {
   const handleFifthStepDone = () => {
     setCurrentStep(5);
   };
 
   useEffect(() => {
     setTimeout(() => {
      handleCreateUser();
      handleFifthStepDone();
     }, 2000)
   }, [])
 
   return (
     <FadeInOut fadeOut={true}>
       <h1>
         <p>Calculating your luck...</p>
         <p>A dice is being thrown for you.</p>
       </h1>
     </FadeInOut>
   );
 };
 
 export default FifthStep;