"use client";
import { createGuessPaper } from "@/api/guesspaper";
import ComponentTitle from "../../common/ComponentTitle";
import { toast } from "react-toastify";
import { IRoomUser } from "@/types/IRoom.model";
import { ICreateGuessPaperGuess } from "@/types/IGuessPaper.model";
import { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import TokenSymbol from "../../common/TokenSymbol";
import CustomButton from "@/components/common/CustomButton";

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

  useEffect(() => {
    console.log("guewsses: ", guesses);
  }, [guesses]);

  return (
    <>
      <ComponentTitle text={"Current Guess Paper"} icon="/ticket.svg" />
      {guesses.length === 0 ? (
        <div className="text-sm">
          <p>{"You have not made any guesses yet."}</p>
        </div>
      ) : (
        <div className="rounded-md gradient-white p-2 border-2 border-primary flex flex-col gap-2">
          <div>
            {guesses.map((guess) => (
              <div>
                <div key={guess.signature} className="flex justify-between">
                  <p>{guess.eventGuessOptionName}</p>
                  <p>{guess.eventGuessOptionCaseName}</p>
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
    </>
  );
};

export default ActiveGuessPaper;
