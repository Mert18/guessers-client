"use client";
import { finalizeEvent, getEvent } from "@/api/event";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IEvent, IEventGuessOptionCase } from "@/types/IEvent.model";

interface IEventFinalizeProps {
  params: {
    eventId: string;
    roomId: string;
  };
}

const EventFinalize = ({ params }: IEventFinalizeProps) => {
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
    const finalizeRequest = {
      winnerEventGuessOptionCases: winningCaseIds,
    };
    finalizeEvent(finalizeRequest, params.eventId, params.roomId).finally(
      () => {
        // TODO fix it what is it
        router.push("/home/room/" + params.roomId);
      }
    );
  };
  return (
    event && (
      <div className="flex flex-col justify-center items-center text-text text-xs">
        <div className="text-primary text-2xl font-bold text-center">
          Finalize Event
        </div>

        <p>Select the winning options.</p>
        <div className="flex flex-col justify-center items-center w-full rounder-md text-primary text-xs">
          <div className="flex justify-between items-center text-primary w-full font-bold border-b border-primary py-2">
            <p>{event.name}</p>

            <p>{new Date(event.createdOn).toLocaleDateString()}</p>
          </div>

          <div className="w-full grid grid-cols-1">
            {event.eventGuessOptions?.map((eventGuessOption) => (
              <div
                key={eventGuessOption.id}
                className="w-full flex flex-col justify-start items-start"
              >
                <p className="text-text text-xs lowercase m-1">
                  {eventGuessOption.name}
                </p>
                <div className="w-full grid auto-cols-fr grid-flow-col">
                  {eventGuessOption.eventGuessOptionCases?.map(
                    (eventGuessOptionCase) => {
                      return (
                        <button
                          key={
                            eventGuessOptionCase.name +
                            "_" +
                            eventGuessOptionCase.odds
                          }
                          className="flex-1 flex flex-col justify-center items-center hover:cursor-pointer"
                          onClick={() =>
                            handleChangeWinningOptions(eventGuessOptionCase)
                          }
                        >
                          <div className="text-text w-full p-2 flex justify-center items-center border-b border-secondary">
                            <p>{eventGuessOptionCase.name}</p>
                          </div>
                          <div
                            className={`${
                              winningOptions.includes(eventGuessOptionCase)
                                ? "bg-primary text-background"
                                : "text-text bg-background2"
                            } w-full p-2 flex justify-center items-center`}
                          >
                            <p>{eventGuessOptionCase.odds}</p>
                          </div>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <PrimaryButton type="submit" text={"finalize"} onClick={() => handleFinalize()} />
      </div>
    )
  );
};

export default EventFinalize;
