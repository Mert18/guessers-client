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
        console.log("respooo: ", response.data);
        setPublicRooms(response.data.rooms?.content);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paging.page]);
  return (
    <div className="w-full my-4">
      <ComponentTitle text="Public rooms" />
      {publicRooms === undefined ? (
        <p className="text-primary">No public rooms available.</p>
      ) : loading ? (
        <Loader />
      ) : (
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
      )}
    </div>
  );
};

export default PublicRoomsList;
