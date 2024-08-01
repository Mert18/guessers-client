"use client";
import { listPublicRooms } from "@/api/room";
import React, { useEffect, useState } from "react";
import PublicRoomCard from "./PublicRoomCard";

const PublicRoomsList = () => {
  const [paging, setPaging] = useState({ page: 0, size: 12 });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listPublicRooms(paging)
      .then((response) => {
        setRooms(response.rooms);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paging]);
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {rooms?.map((room) => (
            <PublicRoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicRoomsList;
