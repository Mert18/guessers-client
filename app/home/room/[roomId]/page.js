"use client";
import { getActiveEvents, getCompletedEvents } from "@/api/event";
import { getRanks, getRoom, getRoomUser } from "@/api/room";
import PlacedBets from "@/components/PlacedBets";
import RoomActiveEvents from "@/components/room/RoomActiveEvents";
import RoomCompletedEvents from "@/components/room/RoomCompletedEvents";
import RoomHeader from "@/components/room/RoomHeader";
import React, { useEffect, useState } from "react";

const Room = ({ params }) => {
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [activeEvents, setActiveEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);
  const [room, setRoom] = useState({});
  const [roomUser, setRoomUser] = useState({});
  const [rankedRiches, setRankedRiches] = useState([]);
  const [rankedPredictions, setRankedPredictions] = useState([]);

  useEffect(() => {
    getRoom(params.roomId).then((response) => {
      setRoom(response.data);
    });

    getRoomUser(params.roomId).then((response) => {
      setRoomUser(response.data);
    });

    getRanks(params.roomId).then((response) => {
      setRankedPredictions(response.data.rankedByCorrectPredictions);
      setRankedRiches(response.data.rankedByBalance);
    });

    getActiveEvents(params.roomId, paging).then((response) => {
      setActiveEvents(response.data.content);
    })

    getCompletedEvents(params.roomId, paging).then((response) => {
      setCompletedEvents(response.data.content);
    })
  }, [params.roomId]);

  return (
    <div className="w-full">
      <RoomHeader room={room} roomUser={roomUser} rankedRiches={rankedRiches} rankedPredictions={rankedPredictions} />

      <RoomActiveEvents activeEvents={activeEvents} />

      <RoomCompletedEvents completedEvents={completedEvents} />

      {/* <PlacedBets roomId={params.roomId} /> */}
    </div>
  );
};

export default Room;
