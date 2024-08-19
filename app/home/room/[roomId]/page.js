"use client";
import { listRoomGuessPapersByStatus } from "@/api/guesspaper";
import { getRoomUser } from "@/api/room";
import RoomActiveEvents from "@/components/room/RoomActiveEvents";
import RoomGuessPapers from "@/components/room/RoomGuessPapers";
import RoomHeader from "@/components/room/RoomHeader";
import React, { useEffect, useState } from "react";

const Room = ({ params }) => {
  const [roomUser, setRoomUser] = useState({});

  const [roomGuessPapers, setRoomGuessPapers] = useState([]);
  const [roomGuessPapersLoading, setRoomGuessPapersLoading] = useState(false);
  const [roomGuessPapersPaging, setRoomGuessPapersPaging] = useState({
    page: 0,
    size: 5,
  });

  const fetchRoomUser = async (roomId) => {
    if (roomId === undefined) return;
    const response = await getRoomUser(roomId);
    setRoomUser(response.data);
  };

  const fetchGuessPapers = async (roomId) => {
    try {
      setRoomGuessPapersLoading(true);
      const response = await listRoomGuessPapersByStatus(roomId, paging);
      setRoomGuessPapers(response.data.content);
    } catch (error) {
      console.error("Error fetching room guess papers", error);
    } finally {
      setRoomGuessPapersLoading(false);
    }
  };

  useEffect(() => {
    if (params.roomId === undefined) return;
    fetchRoomUser(params.roomId);
    fetchGuessPapers(params.roomId);
  }, []);

  useEffect(() => {
    if (params.roomId === undefined) return;
    fetchRoomUser(params.roomId);
    fetchGuessPapers(params.roomId);
  }, [params.roomId]);

  return (
    <div className="w-full">
      {roomUser && (
        <>
          <RoomHeader roomId={params.roomId} roomUser={roomUser} />

          <RoomActiveEvents roomId={params.roomId} roomUser={roomUser} />

          <RoomGuessPapers
            roomId={params.roomId}
            guessPapers={roomGuessPapers}
            paging={roomGuessPapersPaging}
            setPaging={setRoomGuessPapersPaging}
            loading={roomGuessPapersLoading}
          />
        </>
      )}
    </div>
  );
};

export default Room;
