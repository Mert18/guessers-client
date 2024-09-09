"use client";
import { createEventFromReadyEvent } from "@/api/event";
import { getReadyEvents } from "@/api/readyevent";
import React, { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";

const leagues = [
  {
    name: "English Premier League",
    key: "soccer_epl",
  },
  {
    name: "Turkish Super League",
    key: "soccer_turkey_super_league",
  },
];

const ListReadyEvents = ({ handleCloseReadyEventModal, roomId }) => {
  const [selectedLeague, setSelectedLeague] = useState("soccer_epl");
  const [readyEvents, setReadyEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchReadyEvents = (selectedLeague) => {
    setLoading(true);
    getReadyEvents(selectedLeague)
      .then((response) => {
        setReadyEvents(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!selectedLeague) return;
    fetchReadyEvents(selectedLeague);
  }, [selectedLeague]);

  const handleCreateEventFromReadyEvent = (readyEvent) => {
    setLoading(true);
    createEventFromReadyEvent(roomId, readyEvent.id).finally(() => {
      setLoading(false);
      handleCloseReadyEventModal();
      setTimeout(() => {
        router.push(`/home/room/${roomId}`);
      }, 1000);
    });
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {leagues.map((league) => (
          <button
            className={`${
              selectedLeague === league.key
                ? "text-primary underline"
                : "text-text"
            } px-2`}
            key={league.key}
            onClick={() => setSelectedLeague(league.key)}
          >
            {league.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col justify-center items-center w-full py-4 max-h-[300px] overflow-y-auto my-4 border border-primary scrollbar-thin">
        {loading ? (
          <Loader />
        ) : (
          readyEvents.map((readyEvent) => (
            <button
              key={readyEvent.id}
              className="flex flex-col justify-center items-center w-full text-text py-2 cursor-pointer hover:text-primary my-1"
              onClick={() => handleCreateEventFromReadyEvent(readyEvent)}
            >
              <p>{readyEvent.name}</p>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ListReadyEvents;
