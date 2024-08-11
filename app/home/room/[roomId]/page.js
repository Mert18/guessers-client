"use client";
import { getActiveEvents, getCompletedEvents } from "@/api/event";
import { getRanks, getRoom, getRoomUser } from "@/api/room";
import RoomActiveEvents from "@/components/room/RoomActiveEvents";
import RoomCompletedEvents from "@/components/room/RoomCompletedEvents";
import RoomGuessPapers from "@/components/room/RoomGuessPapers";
import RoomHeader from "@/components/room/RoomHeader";
import React, { useEffect, useState } from "react";

const Room = ({ params }) => {
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [activeEvents, setActiveEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [roomUser, setRoomUser] = useState({});
  const [rankedRiches, setRankedRiches] = useState([]);
  const [rankedPredictions, setRankedPredictions] = useState([]);

  useEffect(() => {
    if (params.roomId === undefined) return;

    getRoomUser(params.roomId).then((response) => {
      setRoomUser(response.data);
    });

    getRanks(params.roomId).then((response) => {
      setRankedPredictions(response.data.rankedByCorrectPredictions);
      setRankedRiches(response.data.rankedByBalance);
    });
  }, [params.roomId]);

  useEffect(() => {
    if (params.roomId === undefined) return;

    getActiveEvents(params.roomId, paging).then((response) => {
      setActiveEvents(response.data.content);
    });

    getCompletedEvents(params.roomId, paging).then((response) => {
      setCompletedEvents(response.data.content);
    });
  }, [params.roomId]);

  return (
    <div className="w-1/2">
      <RoomHeader
        roomUser={roomUser}
        rankedRiches={rankedRiches}
        rankedPredictions={rankedPredictions}
      />

      <RoomActiveEvents activeEvents={activeEvents} roomUser={roomUser} />

      {/* <RoomCompletedEvents completedEvents={completedEvents} roomUser={roomUser} /> */}

      <RoomGuessPapers roomId={params.roomId} />
    </div>
  );
};

export default Room;
