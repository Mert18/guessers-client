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
      className={`w-full font-bold p-2 bg-backgroundhover`}
    >
      <div
        className={`w-full flex justify-between`}
      >
        <p className={`flex-1`}>{event.name}</p>

        {roomUser?.owner && (
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

        {event.eventTime && (
          <>
            <p className="flex-1">
              {convertToUserTimeZone(event.eventTime + "")}
            </p>
            {event.status === "IN_PROGRESS" && (
              <div className={`mr-2 ${optionsOpen ? "rotate-180" : ""}`}>
                <Image src="/arrow.svg" alt="arrow" width={10} height={10} />
              </div>
            )}
          </>
        )}

        <button className={`p-1 transition-all ${optionsOpen ? "rotate-180" : "hover:rotate-45"}`} onClick={() => {
          if (event.status === "IN_PROGRESS") {
            setOptionsOpen(!optionsOpen);
          }
        }}>
          <Image src="/arrow.svg" alt="arrow facing downward" width={10} height={10} />
        </button>
      </div>
    </div>
  );
};

export default EventCardHeader;
