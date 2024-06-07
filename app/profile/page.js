"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

const Profile = () => {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("Sesssion: ", session?.user);
  }, [session]);
  return (
    <div>
    </div>
  );
};

export default Profile;
