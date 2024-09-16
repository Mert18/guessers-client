"use client";
import { getRoomUser } from "@/api/room";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SecondaryNavbar = () => {
  const [roomUser, setRoomUser] = useState({});
  const params = useParams();

  useEffect(() => {
    if (params?.roomId === undefined) return;
    getRoomUser(params?.roomId).then((response) => {
      setRoomUser(response.data);
    });
  }, [params?.roomId]);

  return (
    <div className="col-start-2 md:col-start-4 xl:col-start-5 col-end-12 md:col-end-10 xl:col-end-9 text-text">
      {roomUser?.balance >= 0 && (
        <div className="flex justify-center items-center text-xs py-4">
          <p className="font-bold text-primary">
            <span className="text-text">Balance: </span>
            {roomUser?.balance?.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SecondaryNavbar;
