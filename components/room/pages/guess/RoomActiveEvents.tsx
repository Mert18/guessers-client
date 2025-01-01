"use client";
import ComponentTitle from "../../../common/ComponentTitle";
import Loader from "../../../common/Loader";
import Pager from "../../../common/table/Pager";
import { useActiveEvents } from "@/hooks/useActiveEvents";
import { IRoomUser } from "@/types/IRoom.model";
import {
  ICreateGuessPaperGuess,
  IHandleOptionSelected,
} from "@/types/IGuessPaper.model";
import EventCard from "../../event/EventCard";
import TableEmptyInfo from "@/components/common/table/TableEmptyInfo";

interface RoomActiveEventsProps {
  roomId: string;
  roomUser: IRoomUser;
  handleOptionSelected: ({
    event,
    eventGuessOption,
    eventGuessOptionCase,
  }: IHandleOptionSelected) => void;
  guesses: ICreateGuessPaperGuess[];
}

const RoomActiveEvents = ({
  roomId,
  roomUser,
  handleOptionSelected,
  guesses,
}: RoomActiveEventsProps) => {
  const { activeEvents, loading, paging, setPaging } = useActiveEvents({
    roomId,
  });

  const eventsRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (activeEvents?.length === 0) {
      return <TableEmptyInfo text="No active events available." />;
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
    <div className="my-8 text-xs">
      <ComponentTitle text={"Active Events"} icon="/calendar.svg" />
      {eventsRenderer()}
    </div>
  );
};

export default RoomActiveEvents;
