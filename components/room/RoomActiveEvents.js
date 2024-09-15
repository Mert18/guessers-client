"use client";
import React, { useEffect, useState } from "react";
import EventCard from "../events/EventCard";
import ComponentTitle from "../common/ComponentTitle";
import { t } from "i18next";
import Loader from "../common/Loader";
import { getActiveEvents } from "@/api/event";
import Pager from "../common/Pager";

const RoomActiveEvents = ({ roomId, roomUser, handleOptionSelected, guesses}) => {
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [activeEvents, setActiveEvents] = useState([]);

  useEffect(() => {
    setLoading(true);
    getActiveEvents(roomId, paging)
      .then((response) => {
        setActiveEvents(response.data.content);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [roomId, paging.page]);

  const eventsRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (activeEvents.length === 0) {
      return <p className="text-primary">No active events available.</p>;
    } else {
      return (
        <div>
          {activeEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              handleOptionSelected={handleOptionSelected}
              guesses={guesses}
              roomUser={roomUser}
              status="IN_PROGRESS"
            />
          ))}
          <Pager paging={paging} setPaging={setPaging} />
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text={t("activeEvents")} icon="/calendar.svg" />
      {eventsRenderer()}
    </div>
  );
};

export default RoomActiveEvents;
