"use client";
import { listPublicRooms } from "@/api/room";
import React, { useEffect, useState } from "react";
import PublicRoomCard from "./PublicRoomCard";
import ComponentTitle from "../common/ComponentTitle";
import Loader from "../common/Loader";
import { t } from "i18next";

const PublicRoomsList = () => {
  const [publicRooms, setPublicRooms] = useState([]);
  const [paging, setPaging] = useState({ page: 0, size: 5, totalPages: 0, totalElements: 0 });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPublicRooms = async () => {
      setLoading(true);
      try {
        const response = await listPublicRooms(paging);
        if(response.data.rooms?.content === undefined) return;
        setPublicRooms(response.data.rooms?.content);
        setPaging({
          page: response.data.page.number,
          size: response.data.page.size,
          totalPages: response.data.page.totalPages,
          totalElements: response.data.page.totalElements,
        });
      } catch (error) {
        console.error("Error fetching public rooms", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPublicRooms();
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
    <div className="my-8 text-xs">
      <ComponentTitle text="Public rooms" />
      {publicRoomsListRenderer()}
    </div>
  );
};

export default PublicRoomsList;
