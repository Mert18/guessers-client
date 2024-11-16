"use client";
import { getProfile } from "@/api/user";
import { IUser } from "@/types/IUser.model";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type tUser = Promise<{ username: string }>;

const User = async (props: { params: tUser }) => {
  const { data: session } = useSession();
  const [userMetadata, setUserMetadata] = useState<IUser>();
  const { username } = await props.params;

  useEffect(() => {
    
  })
  useEffect(() => {
    getProfile(username).then((response) => {
      setUserMetadata(response.data);
    });
  }, [session, username]);

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
