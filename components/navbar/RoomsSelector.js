"use client";
import React, { useEffect } from "react";
import RoomsMenu from "./RoomsMenu";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const RoomsSelector = ({
  roomsMenuRef,
  setRoomsMenuOpen,
  roomsMenuOpen,
  roomUsers,
  setRoomUser,
  roomId,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    setRoomUser(roomUsers.find((roomUser) => roomUser.room.id == roomId));
  }, [roomUsers, roomId]);

  return (
    <div className="relative w-32 text-text text-xs h-full" ref={roomsMenuRef}>
      <button
        onClick={() => setRoomsMenuOpen(!roomsMenuOpen)}
        className="bg-background3 text-text p-3 flex justify-between w-full rounded-md"
      >
        <div className="flex items-center">
          <Image
            src="/door.svg"
            alt="door"
            width={20}
            height={20}
            className="mr-2"
          />
          <p>
            {roomUsers?.find((roomUser) => roomUser.room.id == roomId)?.room
              .name || t("roomSelect")}
          </p>
        </div>
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
