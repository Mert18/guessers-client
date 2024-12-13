"use client";
import { getProfile } from "@/api/user";
import { IUser } from "@/types/IUser.model";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface IUserProps {
  params: {
    username: string;
  };
}

const User = ({ params }: IUserProps) => {
  const { data: session } = useSession();
  const [userMetadata, setUserMetadata] = useState<IUser>();

  useEffect(() => {
    getProfile(params.username).then((response) => {
      setUserMetadata(response.data);
    });
  }, [session, params.username]);

  return (
    userMetadata && (
      <div className="flex flex-col justify-center items-center text-text-default my-4">
        <h1 className="font-bold text-2xl my-2"><span className="text-text-default">Welcome, </span>{userMetadata.username}</h1>
        <p><span className="text-primary text-base font-bold">%{userMetadata.luck.toFixed(2)}</span> luck percentage.</p>
      </div>
    )
  );
};
export default User;
