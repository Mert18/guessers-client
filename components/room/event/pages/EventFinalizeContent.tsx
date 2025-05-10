"use client";
import { getEvent, finalizeEvent } from "@/api/event";
import { getRoom } from "@/api/room";
import CustomButton from "@/components/common/CustomButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import RoomName from "@/components/room/layout/RoomName";
import {
  IEvent,
  IEventGuessOptionCase,
  IFinalizeEventRequest,
} from "@/types/IEvent.model";
import { IRoomBasic } from "@/types/IRoom.model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IEventFinalizeContentProps {
  params: {
    eventId: string;
    roomId: string;
  };
}

const EventFinalizeContent = ({ params }: IEventFinalizeContentProps) => {
  const [room, setRoom] = useState<IRoomBasic>();
  const [event, setEvent] = useState<IEvent>();
  const [winningOptions, setWinningOptions] = useState<IEventGuessOptionCase[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    getEvent(params.eventId).then((response) => {
      setEvent(response.data);
    });
  }, []);

  useEffect(() => {
    getRoom(params.roomId).then((response) => {
      setRoom(response.data);
    });
  }, [params.roomId]);

  const handleChangeWinningOptions = (
    eventGuessOptionCase: IEventGuessOptionCase
  ) => {
    if (winningOptions.includes(eventGuessOptionCase)) {
      setWinningOptions(
        winningOptions.filter(
          (winningOption) => winningOption !== eventGuessOptionCase
        )
      );
    } else {
      setWinningOptions([...winningOptions, eventGuessOptionCase]);
    }
  };

  const handleFinalize = () => {
    const winningCaseIds = winningOptions.map(
      (winningOption) => winningOption.id
    );
    const finalizeRequest: IFinalizeEventRequest = {
      winnerEventGuessOptionCases: winningCaseIds,
    };
    finalizeEvent({
      request: finalizeRequest,
      eventId: params.eventId,
      roomId: params.roomId,
    }).finally(() => {
      router.push("/home/room/" + params.roomId + "/guess");
    });
  };
  return (
    event &&
    room && (
      <div className="flex flex-col justify-center items-center text-sm">
        <ComponentTitle text="Finalize Event" />

        <RoomName roomName={room.name} roomId={room.id} />

        <p className="my-2">Select the winning options.</p>
        <div className="flex flex-col justify-center items-center w-full text-sm bg-white-bright border-2 border-primary rounded-md">
          <div className="flex justify-between items-center w-full font-bold p-4">
            <p>{event.name}</p>

            <p>{new Date(event.createdOn).toLocaleString()}</p>
          </div>

          <div className="w-full grid grid-cols-1 gap-5 p-2">
            {event.eventGuessOptions?.map((eventGuessOption) => (
              <div
                key={eventGuessOption.id}
                className="flex flex-col justify-start items-start w-full"
              >
                <p className="p-2 text-sm text-black my-0.5 font-bold">
                  {eventGuessOption.name}
                </p>
                <div className="w-full grid grid-cols-2 gap-x-1">
                  {eventGuessOption.eventGuessOptionCases?.map(
                    (eventGuessOptionCase) => {
                      return (
                        <button
                          key={
                            eventGuessOptionCase.name
                          }
                          className="flex flex-col justify-center items-center hover:cursor-pointer m-0.5 w-full"
                          onClick={() =>
                            handleChangeWinningOptions(eventGuessOptionCase)
                          }
                        >
                          <p className={`${winningOptions.some((guess) => guess.id === eventGuessOptionCase.id) ? "gradient-primary text-white" : "gradient-white text-black"} w-full flex justify-start items-center p-2 rounded-md`}>
                              {eventGuessOptionCase.name}
                          </p>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="my-4">
          <CustomButton
            type="submit"
            text={"Finalize Event"}
            onClick={() => handleFinalize()}
            bg
          />
        </div>
      </div>
    )
  );
};

export default EventFinalizeContent;
