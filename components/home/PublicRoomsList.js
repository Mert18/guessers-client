"use client";
import { listPublicRooms } from "@/api/room";
import React, { useEffect, useState } from "react";
import PublicRoomCard from "./PublicRoomCard";
import ComponentTitle from "../common/ComponentTitle";

const PublicRoomsList = () => {
  const [paging, setPaging] = useState({ page: 0, size: 12 });
  const [publicRooms, setPublicRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPublicRooms(paging)
      .then((response) => {
        setPublicRooms(response.data.rooms?.content);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paging]);
  return (
    <div className="w-full">
      <ComponentTitle text="Public rooms" />
      <div className="w-full">
        {publicRooms?.map((room) => (
          <PublicRoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default PublicRoomsList;
