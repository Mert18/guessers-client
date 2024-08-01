"use client";
import React from "react";
import RoomsMenu from "./RoomsMenu";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const RoomsSelector = ({
  roomsMenuRef,
  setRoomsMenuOpen,
  roomsMenuOpen,
  rooms,
  roomId,
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative w-32 text-text text-xs my-6" ref={roomsMenuRef}>
      <button
        onClick={() => setRoomsMenuOpen(!roomsMenuOpen)}
        className="bg-background_lighter text-text p-1 flex justify-between w-full"
      >
        <p>
          {rooms?.find((room) => room.id === roomId)?.name || t("roomSelect")}
        </p>
      </button>
      {roomsMenuOpen && (
        <RoomsMenu
          rooms={rooms}
          setRoomsMenuOpen={setRoomsMenuOpen}
          roomId={roomId}
        />
      )}
    </div>
  );
};

export default RoomsSelector;
