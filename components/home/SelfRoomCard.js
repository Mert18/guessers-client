import { t } from "i18next";
import Link from "next/link";
import React from "react";

const SelfRoomCard = ({ roomUser }) => {
  return (
    <Link
      href={`/home/room/${roomUser.room.id}`}
      className="w-full text-text"
    >
      <div className="bg-background flex justify-start items-center text-text border-b border-primary hover:underline hover:text-primary py-1">
        <h2 className="flex-1">{roomUser.room.name}</h2>
        <p className="flex-1">{roomUser.room.owner.username}</p>
        <p className="flex-1">{roomUser.memberCount}</p>
        <p className="flex-1">{roomUser.room.public ? <span>{t("yes")}</span> : <span>{t("no")}</span>}</p>
        <p className="flex-1">{roomUser.balance.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default SelfRoomCard;
