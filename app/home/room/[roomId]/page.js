"use client";
import { getRoomUser } from "@/api/room";
import RoomActiveEvents from "@/components/room/RoomActiveEvents";
import RoomGuessPapers from "@/components/room/RoomGuessPapers";
import RoomHeader from "@/components/room/RoomHeader";
import React, { useEffect, useState } from "react";

const Room = ({ params }) => {
  const [roomUser, setRoomUser] = useState({});

  useEffect(() => {
    if (params.roomId === undefined) return;

    getRoomUser(params.roomId).then((response) => {
      setRoomUser(response.data);
    });
  }, [params.roomId]);

  return (
    <div className="w-full">
      <RoomHeader roomId={params.roomId} roomUser={roomUser} />

      <RoomActiveEvents roomId={params.roomId} roomUser={roomUser} />

      <RoomGuessPapers roomId={params.roomId} />
    </div>
  );
};

export default Room;
