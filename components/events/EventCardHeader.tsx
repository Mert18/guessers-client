import Image from "next/image";
import SecondaryButton from "../common/button/SecondaryButton";
import { IEvent } from "@/types/IEvent.model";
import { IRoomUser } from "@/types/IRoom.model";
import { convertToUserTimeZone } from "@/util/dateUtil";

interface IEventCardHeaderProps {
  event: IEvent;
  optionsOpen: boolean;
  setOptionsOpen: (optionsOpen: boolean) => void;
  handleStartEvent: (event: IEvent) => void;
  roomUser: IRoomUser;
}

const EventCardHeader = ({
  event,
  optionsOpen,
  setOptionsOpen,
  handleStartEvent,
  roomUser,
}: IEventCardHeaderProps) => {

  return (
    <div
      className={`flex flex-col justify-between items-center w-full font-bold border-b border-primary`}
    >
      <button
        className={`flex justify-between items-center w-full ${event.status === "IN_PROGRESS" ? "cursor-pointer" : "text-text"}`}
        onClick={() => {
          if (event.status === "IN_PROGRESS") {
            setOptionsOpen(!optionsOpen);
          }
        }}
      >
        <p className={`flex-1`}>{event.name}</p>

        {roomUser.isOwner && (
          <div className="flex flex-1">
            {event.status === "IN_PROGRESS" ? (
              <SecondaryButton
                text="Start Event"
                onClick={() => handleStartEvent(event)}
                
              />
            ) : (
              event.status === "STARTED" && (
                <SecondaryButton
                  text="Finalize Event"
                  href={`/home/room/${roomUser.room.id}/event/${event.id}/finalize`}
                  
                />
              )
            )}
          </div>
        )}

        <p className="flex-1">{convertToUserTimeZone(event.eventTime + "")}</p>
        {event.status === "IN_PROGRESS" && (
          <div className={`mr-2 ${optionsOpen ? "rotate-180" : ""}`}>
            <Image src="/arrow.svg" alt="arrow" width={10} height={10} />
          </div>
        )}
      </button>
    </div>
  );
};

export default EventCardHeader;
