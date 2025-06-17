"use client";
import { createGuessPaper } from "@/api/guesspaper";
import ComponentTitle from "../../common/ComponentTitle";
import { toast } from "react-toastify";
import { IRoomUser } from "@/types/IRoom.model";
import { ICreateGuessPaperGuess } from "@/types/IGuessPaper.model";
import { useState } from "react";
import Loader from "../../common/Loader";
import CustomButton from "@/components/common/CustomButton";
import Image from "next/image";

interface IActiveGuessPaperProps {
  guesses: ICreateGuessPaperGuess[];
  roomUser: IRoomUser;
  resetGuessPaper: () => void;
}

const ActiveGuessPaper = ({
  guesses,
  roomUser,
  resetGuessPaper,
}: IActiveGuessPaperProps) => {
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
    <div className="mt-4">
      <ComponentTitle
        text={"Current Guess Paper"}
        icon={
          <Image
            src={"/icons/receipt.svg"}
            width={20}
            height={20}
            alt="guess-paper"
          />
        }
      />
      <div className="min-h-40 max-h-40 overflow-y-auto border-2 border-primary rounded-md gradient-white">
        {guesses.length === 0 ? (
          <div className="p-2">
            <p>
              {
                "You have not made any guesses yet. Your guesses will show up here."
              }
            </p>
          </div>
        ) : (
          <div className="rounded-md gradient-white p-2 m-2 flex flex-col gap-2">
            <div>
              {guesses.map((guess) => (
                <div>
                  <div key={guess.signature} className="flex p-1">
                    <p className="flex-1">{guess.eventName}</p>
                    <p className="flex-1 flex justify-end">
                      {guess.eventGuessOptionName}
                    </p>
                    <p className="flex-1 flex justify-end">
                      {guess.eventGuessOptionCaseName}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {loading ? (
              <Loader />
            ) : (
              <CustomButton
                type="button"
                text="CREATE"
                onClick={() => sendGuessPaper()}
                bg
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveGuessPaper;
