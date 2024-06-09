"use client";
import { getEvents } from "@/api/event";
import { isOwner } from "@/api/room";
import BetScreen from "@/components/BetScreen";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Room = ({ params }) => {
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [owner, setOwner] = useState(false);
  const [activeEvents, setActiveEvents] = useState([]);

  useEffect(() => {
    isOwner(params.roomId).then((data) => {
      setOwner(data.data.owner)
    });

    getEvents({roomId: params.roomId, paging: paging}).then((res) => {
      console.log(res.data.content);
      setActiveEvents(res.data.content);
    });
  }, []);

  return <div>
    {owner ? <p>You are the owner of this room</p> : <p>You are not the owner of this room</p>}

    {owner && 
    <div>
    <Link href={`/room/${params.roomId}/event/create`}>
      Create Event
    </Link>
    <Link href={`/room/${params.roomId}/invite`}>
      Invite People
    </Link>
    </div>
    }


    <BetScreen events={activeEvents} roomId={params.roomId} />
  </div>;
};

export default Room;
