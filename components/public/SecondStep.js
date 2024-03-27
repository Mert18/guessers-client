"use client";
import React from "react";
import FadeInOut from "../common/FadeInOut";
import { signIn } from "next-auth/react";

const SecondStep = ({ createdUser }) => {
  return (
    <FadeInOut>
      <div className="flex flex-col justify-center items-center">
        <h1>You are created!</h1>

        {createdUser.name && createdUser.identityNumber && (
          <>
            <div className="flex justify-center">
              <p className="mr-2">Name:</p>
              <p className="scale-125">{createdUser.name}</p>
            </div>
            <div className="flex justify-center">
              <p className="mr-2">Identity Number:</p>
              <p className="scale-125">{createdUser.identityNumber}</p>
            </div>
          </>
        )}

        <button
          className="border border-gray-400 rounded-md p-2 m-2 text-center hover:bg-gray-200"
          onClick={() => signIn("keycloak")}
        >
          Entrance of the world
        </button>
      </div>
    </FadeInOut>
  );
};

export default SecondStep;
