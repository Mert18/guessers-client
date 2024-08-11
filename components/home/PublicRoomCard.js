import React from "react";
import PrimaryButton from "../common/button/PrimaryButton";
import { joinPublicRoom } from "@/api/room";

const PublicRoomCard = ({ room }) => {
  const handleJoinRoom = () => {
    joinPublicRoom(room.id).finally(() => {
      window.location.reload();
    });
  };
  return (
    <div className="w-full text-text">
      <div className="bg-background flex justify-start items-center text-text border-b border-primary">
        <h2 className="flex-1">{room.name}</h2>
        <p className="flex-1">{room.owner.username}</p>
        <p className="flex-1">{room.memberCount}</p>
        <div className="flex-1">
          <PrimaryButton type="button" onClick={handleJoinRoom} text="Join" noBg={true} />
        </div>
      </div>
    </div>
  );
};

export default PublicRoomCard;
