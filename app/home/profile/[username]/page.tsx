"use client";
import { getProfile } from "@/api/user";
import { IUser } from "@/types/IUser.model";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface IUserProps {
  params: {
    username: string;
  };
}

const User = ({ params }: IUserProps) => {
  const { data: session } = useSession();
  const [userMetadata, setUserMetadata] = useState<IUser>();

  useEffect(() => {
    
  })
  useEffect(() => {
    getProfile(params.username).then((response) => {
      setUserMetadata(response.data);
    });
  }, [session, params.username]);

  return (
    userMetadata && (
      <div className="flex flex-col justify-center items-center text-text">
        <h1 className="font-bold text-2xl"><span className="text-primary">Welcome, </span>{userMetadata.username}</h1>
        <p>{userMetadata.luck}</p>
      </div>
    )
  );
};
export default User;
