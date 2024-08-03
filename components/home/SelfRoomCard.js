import Link from "next/link";
import React from "react";

const SelfRoomCard = ({ roomUser }) => {
  return (
    <Link
      href={`/room/${roomUser.room.id}`}
      className="w-full text-text"
    >
      <div className="p-2 bg-background_lighter rounded-md hover:bg-secondary transition-all">
        <h2 className="">{roomUser.room.name}</h2>
        <p>{roomUser.owner ? <span>owner</span> : ""}</p>
        <p>{roomUser.room.public ? <span>public</span> : ""}</p>
      </div>
    </Link>
  );
};

export default SelfRoomCard;
