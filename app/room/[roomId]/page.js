"use client";
import { getEvents } from "@/api/event";
import { getRoom, isOwner, rankPredictions, rankRiches } from "@/api/room";
import BetScreen from "@/components/BetScreen";
import PlacedBets from "@/components/PlacedBets";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Room = ({ params }) => {
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [owner, setOwner] = useState(false);
  const [activeEvents, setActiveEvents] = useState([]);
  const [room, setRoom] = useState({});
  const [rankedPredictions, setRankedPredictions] = useState([]);
  const [rankedRiches, setRankedRiches] = useState([]);

  useEffect(() => {
    getRoom(params.roomId).then((response) => {
      setRoom(response.data);
    });

    isOwner(params.roomId).then((response) => {
      setOwner(response.data.owner);
    });

    getEvents({ roomId: params.roomId, paging: paging }).then((response) => {
      setActiveEvents(response.data.content);
    });

    rankPredictions(params.roomId).then((response) => {
      setRankedPredictions(response.data);
    });

    rankRiches(params.roomId).then((response) => {
      setRankedRiches(response.data);
    });
  }, []);

  return (
    <div>
      {owner && (
        <div>
          <Link href={`/room/${params.roomId}/event/create`} className="p-2 bg-tertiary-darker text-background font-bold hover:bg-tertiary">
            Create Event
          </Link>
          <Link href={`/room/${params.roomId}/invite`} className="p-2 bg-secondary-darker text-background font-bold hover:bg-secondary">
            Invite People
          </Link>
        </div>
      )}

      <BetScreen events={activeEvents} roomId={params.roomId} owner={owner} />

      <hr />

      <PlacedBets roomId={params.roomId} />
    </div>
  );
};

export default Room;
