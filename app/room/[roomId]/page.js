"use client";
import { getEvents } from "@/api/event";
import { getMetadataAndRanks, getRoom, isOwner, rankPredictions, rankRiches } from "@/api/room";
import BetScreen from "@/components/BetScreen";
import PlacedBets from "@/components/PlacedBets";
import RoomHeader from "@/components/room/RoomHeader";
import React, { useEffect, useState } from "react";

const Room = ({ params }) => {
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [owner, setOwner] = useState(false);
  const [activeEvents, setActiveEvents] = useState([]);
  const [room, setRoom] = useState({});
  const [rankedRiches, setRankedRiches] = useState([]);
  const [rankedPredictions, setRankedPredictions] = useState({});

  useEffect(() => {
    getMetadataAndRanks(params.roomId).then((response) => {
      setOwner(response.data.owner);
      setRankedRiches(response.data.riches);
      setRankedPredictions(response.data.rankPredictions);
      setRoom(response.data.room);
    });
  }, [params.roomId]);

  useEffect(() => {
    getEvents(params.roomId, paging).then((response) => {
      setActiveEvents(response.data.content);
    })
  }, [params.roomId])

  return (
    <div>
      <RoomHeader room={room} rankedRiches={rankedRiches} owner={owner} rankedPredictions={rankedPredictions} />

      <BetScreen events={activeEvents} roomId={params.roomId} owner={owner} />

      <hr />

      <PlacedBets roomId={params.roomId} />
    </div>
  );
};

export default Room;
