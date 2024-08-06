import React from "react";
import PrimaryButton from "../common/button/PrimaryButton";
import { joinPublicRoom } from "@/api/room";

const PublicRoomCard = ({ room }) => {
  const handleJoinRoom = () => {
    joinPublicRoom(room.id).finally(() => {
      window.location.reload();
    })
  };
  return (
    <div className="w-full p-2 text-text flex justify-between items-center bg-background2 rounded-md">
      <div className="p-2 my-2 rounded-md transition-all">
        <h2>{room.name}</h2>
        <p>{room.owner.username}</p>
      </div>
      <div className="w-32">
        <PrimaryButton type="button" onClick={handleJoinRoom} text="Join" />
      </div>
    </div>
  );
};

export default PublicRoomCard;
