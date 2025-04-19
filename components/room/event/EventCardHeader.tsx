import Image from "next/image";
import { IEvent } from "@/types/IEvent.model";
import { IRoomUser } from "@/types/IRoom.model";
import { convertToUserTimeZone } from "@/util/dateUtil";
import { useState } from "react";
import Link from "next/link";

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
  const [eventHeaderOptionsOpen, setEventHeaderOptionsOpen] =
    useState<boolean>(false);

  return (
    <div className={`w-full font-bold p-2`}>
      <div className={`w-full flex justify-between items-center`}>
        <p className={`flex-1 text-base`}>{event.name}</p>

        {event.eventTime && (
          <>
            <p className="flex-1">
              {convertToUserTimeZone(event.eventTime + "")}
            </p>
          </>
        )}

        <div className="flex justify-center items-center gap-2">
          {event.status === "IN_PROGRESS" && (
            <button
              className={`transition-all ${
                optionsOpen ? "rotate-180" : "hover:rotate-45"
              } gradient-white border-2 border-primary rounded-md p-2`}
              onClick={() => {
                setOptionsOpen(!optionsOpen);
              }}
            >
              <Image
                src="/arrow.svg"
                alt="arrow facing downward"
                width={8}
                height={8}
              />
            </button>
          )}

          {roomUser?.owner && (
            <div className="relative">
              <button
                className={`transition-all hover:bg-white bg-white-bright border-2 border-primary rounded-md`}
                onClick={() => {
                  setEventHeaderOptionsOpen(!eventHeaderOptionsOpen);
                }}
              >
                <Image
                  src="/icons/dots.svg"
                  alt="three dots"
                  width={24}
                  height={24}
                />
              </button>
              {eventHeaderOptionsOpen && (
                <div className="absolute right-0 z-50 gradient-white border-2 border-primary text-black rounded-md p-2">
                  {event.status === "IN_PROGRESS" ? (
                    <button
                      type="button"
                      className="hover:text-primary"
                      onClick={() => handleStartEvent(event)}
                    >
                      Start
                    </button>
                  ) : (
                    event.status === "STARTED" && (
                      <Link
                        href={`/home/room/${roomUser.room.id}/event/${event.id}/finalize`}
                        className="hover:text-primary"
                      >
                        Finalize
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCardHeader;
