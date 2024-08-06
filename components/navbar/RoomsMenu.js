"use client";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../common/button/PrimaryButton";

const RoomsMenu = ({ roomUsers, setRoomsMenuOpen, roomId }) => {
  const { t } = useTranslation();
  return (
    <div className="absolute top-full left-0 w-32 bg-background2">
      {roomUsers?.map((roomUser) => (
        <Link
          key={roomUser.room.id}
          href={`/home/room/${roomUser.room.id}`}
          className={`p-2 w-full block ${
            roomId === roomUser.room.id ? "bg-primary" : ""
          } hover:bg-secondary`}
          onClick={() => setRoomsMenuOpen(false)}
        >
          <p className="p-2 text-text">{roomUser.room.name}</p>
        </Link>
      ))}
      <PrimaryButton
        text={t("roomCreate")}
        href="/home/room/create"
        onClick={() => setRoomsMenuOpen(false)}
      />
    </div>
  );
};

export default RoomsMenu;
