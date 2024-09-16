"use client";
import React from "react";
import EventCard from "../events/EventCard";
import ComponentTitle from "../common/ComponentTitle";
import { t } from "i18next";
import Loader from "../common/Loader";
import Pager from "../common/Pager";
import { useActiveEvents } from "@/hooks/useActiveEvents";

const RoomActiveEvents = ({
  roomId,
  roomUser,
  handleOptionSelected,
  guesses,
}) => {
  const { activeEvents, loading, paging, setPaging } = useActiveEvents(roomId);

  const eventsRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (activeEvents?.length === 0) {
      return <p className="text-primary">No active events available.</p>;
    } else {
      return (
        <div>
          {activeEvents?.map((event) => (
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
