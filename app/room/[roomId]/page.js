"use client";
import { checkBetSlips } from "@/api/bet";
import { getEvents } from "@/api/event";
import { getRoom, isOwner } from "@/api/room";
import BetScreen from "@/components/BetScreen";
import PlacedBets from "@/components/PlacedBets";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Room = ({ params }) => {
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [owner, setOwner] = useState(false);
  const [activeEvents, setActiveEvents] = useState([]);
  const [room, setRoom] = useState({});

  useEffect(() => {
    getRoom(params.roomId).then((response) => {
      setRoom(response.data);
    });

    isOwner(params.roomId).then((response) => {
      setOwner(response.data.owner);
    });

    getEvents({ roomId: params.roomId, paging: paging }).then((response) => {
      console.log(response.data.content);
      setActiveEvents(response.data.content);
    });
  }, []);

  return (
    <div>
      {owner ? (
        <p>You are the owner of this room</p>
      ) : (
        <p>You are not the owner of this room</p>
      )}

      {owner && (
        <div>
          <Link href={`/room/${params.roomId}/event/create`}>Create Event</Link>
          <Link href={`/room/${params.roomId}/invite`}>Invite People</Link>
          <button onClick={() => checkBetSlips(params.roomId)}>
            Check Betslips
          </button>
        </div>
      )}

      <BetScreen events={activeEvents} roomId={params.roomId} owner={owner} />

      <hr />

      <PlacedBets roomId={params.roomId} />
    </div>
  );
};

export default Room;
