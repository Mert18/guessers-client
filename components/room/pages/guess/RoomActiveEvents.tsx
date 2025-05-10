"use client";
import ComponentTitle from "../../../common/ComponentTitle";
import Loader from "../../../common/Loader";
import Pager from "../../../common/Pager";
import { useActiveEvents } from "@/hooks/useActiveEvents";
import { IRoomUser } from "@/types/IRoom.model";
import { ICreateGuessPaperGuess, IHandleOptionSelected } from "@/types/IGuessPaper.model";
import EventCard from "../../event/EventCard";
import Image from "next/image";

interface RoomActiveEventsProps {
  roomId: string;
  roomUser: IRoomUser;
  handleOptionSelected: ({ event, eventGuessOption, eventGuessOptionCase}: IHandleOptionSelected) => void;
  guesses: ICreateGuessPaperGuess[];
}

const RoomActiveEvents = ({
  roomId,
  roomUser,
  handleOptionSelected,
  guesses,
}: RoomActiveEventsProps) => {
  const { activeEvents, loading, paging, setPaging } = useActiveEvents({roomId});

  const eventsRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (activeEvents?.length === 0) {
      return <p className="text-text">No active events available.</p>;
    } else {
      return (
        <div>
          {activeEvents
            ?.sort((a, b) => b.eventTime - a.eventTime)
            .map((event) => (
              <EventCard
                key={event.id}
                event={event}
                handleOptionSelected={handleOptionSelected}
                guesses={guesses}
                roomUser={roomUser}
              />
            ))}
          <Pager paging={paging} setPaging={setPaging} />
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-sm">
      <ComponentTitle text={"Active Events"}
        icon={
          <Image 
            src={"/icons/calendar.svg"}
            width={20}
            height={20}
            alt="calendar"
          />
        }
      />
      {eventsRenderer()}
    </div>
  );
};

export default RoomActiveEvents;
