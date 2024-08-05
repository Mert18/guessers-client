"use client";
import React from "react";
import RoomsMenu from "./RoomsMenu";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const RoomsSelector = ({
  roomsMenuRef,
  setRoomsMenuOpen,
  roomsMenuOpen,
  roomUsers,
  roomId,
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-32 text-text text-xs mr-8 h-full" ref={roomsMenuRef}>
      <button
        onClick={() => setRoomsMenuOpen(!roomsMenuOpen)}
        className="bg-background_lighter text-text p-3 flex justify-between w-full"
      >
        <p>
          {roomUsers?.find((roomUser) => roomUser.id === roomId)?.name || t("roomSelect")}
        </p>
      </button>
      {roomsMenuOpen && (
        <RoomsMenu
        roomUsers={roomUsers}
          setRoomsMenuOpen={setRoomsMenuOpen}
          roomId={roomId}
        />
      )}
    </div>
  );
};

export default RoomsSelector;
