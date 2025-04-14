"use client";
import { createGuessPaper } from "@/api/guesspaper";
import ComponentTitle from "../../common/ComponentTitle";
import { toast } from "react-toastify";
import { IRoomUser } from "@/types/IRoom.model";
import { ICreateGuessPaperGuess } from "@/types/IGuessPaper.model";
import { useState } from "react";
import Loader from "../../common/Loader";
import TokenSymbol from "../../common/TokenSymbol";
import CustomButton from "@/components/common/CustomButton";
import { ColorEnum } from "@/enum/enum";

interface IActiveGuessPaperProps {
  guesses: ICreateGuessPaperGuess[];
  totalOdds: number;
  stake: number;
  setStake: (stake: number) => void;
  wins: number;
  roomUser: IRoomUser;
  resetGuessPaper: () => void;
}

const ActiveGuessPaper = ({
  guesses,
  totalOdds,
  stake,
  setStake,
  wins,
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
      stake: stake,
      roomId: roomUser.room.id,
    };

    createGuessPaper(guessPaperToCreate).finally(() => {
      setLoading(false);
      resetGuessPaper();
    });
  };

  return (
    <>
      <ComponentTitle text={"Current Guess Paper"} icon="/ticket.svg" />
      <div className="flex w-full h-48">
        <div className="flex justify-start items-start flex-col gradient-primary-2 rounded-md text-white w-full">
          <div className="flex justify-around w-full items-center h-full">
            <div className="flex flex-col justify-center items-start">
              <p>{"Total Odds"}</p>
              <p className="font-bold text-lg">{totalOdds}</p>
            </div>
            <div className="flex flex-col justify-center items-start">
              <p>{"Stakes"}</p>
              <p>
                <span className="font-bold text-lg">{stake}</span>{" "}
                <button
                  className="text-xl mr-1"
                  onClick={() => setStake(stake + 50)}
                >
                  +
                </button>
                <button
                  className="text-xl"
                  onClick={() => {
                    if (stake > 100) {
                      setStake(stake - 50);
                    }
                  }}
                >
                  -
                </button>
              </p>
            </div>

            <div className="flex flex-col justify-center items-start">
              <p>{"Wins"}</p>
              <p className=" font-bold flex justify-center items-center text-lg">
                {wins}
                <TokenSymbol />
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {loading ? (
            <Loader />
          ) : (
            <button
              className="ml-1 gradient-secondary rounded-md text-white p-2 flex justify-center items-center flex-col w-12 font-bold h-full"
              onClick={() => sendGuessPaper()}
            >
              <span>C</span>
              <span>R</span>
              <span>E</span>
              <span>A</span>
              <span>T</span>
              <span>E</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ActiveGuessPaper;
