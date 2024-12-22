"use client";
import { createGuessPaper } from "@/api/guesspaper";
import ComponentTitle from "../../common/ComponentTitle";
import { toast } from "react-toastify";
import { IRoomUser } from "@/types/IRoom.model";
import { ICreateGuessPaperGuess } from "@/types/IGuessPaper.model";
import { useState } from "react";
import Loader from "../../common/Loader";
import PrimaryButton from "@/components/common/button/PrimaryButton";

interface ICurrentGuessPaperProps {
  guesses: ICreateGuessPaperGuess[];
  roomUser: IRoomUser;
  resetGuessPaper: () => void;
}

const CurrentGuessPaper = ({
  guesses,
  roomUser,
  resetGuessPaper,
}: ICurrentGuessPaperProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendGuessPaper = () => {
    if (guesses.length === 0) {
      toast.error("Your guess paper is empty.");
      return;
    }
    setLoading(true);
    const guessPaperToCreate = {
      guesses: guesses,
      roomId: roomUser.room.id,
    };

    createGuessPaper(guessPaperToCreate).finally(() => {
      setLoading(false);
      resetGuessPaper();
    });
  };

  return (
    <div className="my-4">
      <ComponentTitle text={"Current Guess Paper"} icon="/ticket.svg" />
      <div className="flex flex-col w-full">
        <div className="flex flex-col flex-1 text-text-default">
          {guesses.map((guess) => {
            return (
              <div className="flex justify-between items-center my-2 text-xs">
                <p>{guess.eventGuessOptionName}</p>
                <p>{guess.eventGuessOptionCaseName}</p>
              </div>
            );
          })}
        </div>
        {guesses.length !== 0 ? (
          <div className="flex justify-center items-center">
            {loading ? (
              <Loader />
            ) : (
              <PrimaryButton
                onClick={() => sendGuessPaper()}
                type="submit"
                text={"CREATE"}
                bg={true}
              />
            )}
          </div>
        ) : <p className="text-xs text-text-default">Your guess paper is empty.</p>}
      </div>
    </div>
  );
};

export default CurrentGuessPaper;
