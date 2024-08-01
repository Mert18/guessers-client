"use client";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../common/button/PrimaryButton";

const RoomsMenu = ({ rooms, setRoomsMenuOpen, roomId }) => {
  const { t } = useTranslation();

  return (
    <div className="absolute top-full left-0 w-32 bg-background_lighter">
      {rooms?.map((room) => (
        <Link
          key={room.id}
          href={`/room/${room.id}`}
          className={`p-2 w-full text-background block ${
            roomId === room.id ? "bg-primary" : ""
          } hover:bg-primary-brighter`}
          onClick={() => setRoomsMenuOpen(false)}
        >
          <p>{room.name}</p>
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
