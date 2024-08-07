"use client";
import { getProfile } from "@/api/user";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const User = ({params}) => {
  const { data: session } = useSession();
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [userMetadata, setUserMetadata] = useState({});

  useEffect(() => {
    getProfile(params.username).then((response) => {
      setUserMetadata(response.data)
    });
  }, [session]);
  return (
    <div className="flex flex-col justify-center items-center text-text">
        <h1 className="font-bold text-2xl">{userMetadata.username}</h1>
        <p>{userMetadata.luck}</p>
    </div>
  );
};
export default User;
