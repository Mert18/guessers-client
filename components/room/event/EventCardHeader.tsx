import Image from "next/image";
import { IEvent } from "@/types/IEvent.model";
import { IRoomUser } from "@/types/IRoom.model";
import { convertToUserTimeZone } from "@/util/dateUtil";
import PrimaryButton from "@/components/common/button/PrimaryButton";

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
      className={`w-full font-bold p-2`}
    >
      <div
        className={`w-full flex justify-between items-center`}
      >
        <p className={`flex-1`}>{event.name}</p>

        {roomUser?.owner && (
          <div className="flex-1">
            <div className="mr-5">
            {event.status === "IN_PROGRESS" ? (
              <PrimaryButton bg type="button" text="Start Event" onClick={() => handleStartEvent(event)} />
            ) : (
              event.status === "STARTED" && (
                <PrimaryButton bg type="button" text="Finalize Event" href={`/home/room/${roomUser.room.id}/event/${event.id}/finalize`} />
              )
            )}
            </div>
          </div>
        )}

        {event.eventTime && (
          <>
            <p className="flex-1">
              {convertToUserTimeZone(event.eventTime + "")}
            </p>
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
