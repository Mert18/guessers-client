"use client";
import { listPublicRooms } from "@/api/room";
import React, { useEffect, useState } from "react";
import PublicRoomCard from "./PublicRoomCard";
import ComponentTitle from "../common/ComponentTitle";
import Loader from "../common/Loader";
import { t } from "i18next";

const PublicRoomsList = () => {
  const [publicRooms, setPublicRooms] = useState([]);
  const [paging, setPaging] = useState({ page: 0, size: 5 });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    listPublicRooms(paging)
      .then((response) => {
        if(response.data.rooms?.content === undefined) return;
        setPublicRooms(response.data.rooms?.content);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paging.page]);

  const publicRoomsListRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (publicRooms.length === 0) {
      return <p className="text-primary">No public rooms available.</p>;
    } else {
      return (
        <div className="w-full">
          <div className="bg-background flex justify-start items-center text-primary border-b border-primary">
            <h2 className="flex-1">{t("roomName")}</h2>
            <h2 className="flex-1">{t("owner")}</h2>
            <h2 className="flex-1">{t("memberCount")}</h2>
            <h2 className="flex-1">{t("join")}</h2>
          </div>

          {publicRooms?.map((room) => (
            <PublicRoomCard key={room.id} room={room} />
          ))}
        </div>
      );
    }
  };
  return (
    <div className="my-8">
      <ComponentTitle text="Public rooms" />
      {publicRoomsListRenderer()}
    </div>
  );
};

export default PublicRoomsList;
