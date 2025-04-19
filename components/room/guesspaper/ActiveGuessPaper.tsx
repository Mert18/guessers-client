"use client";
import { createGuessPaper } from "@/api/guesspaper";
import ComponentTitle from "../../common/ComponentTitle";
import { toast } from "react-toastify";
import { IRoomUser } from "@/types/IRoom.model";
import { ICreateGuessPaperGuess } from "@/types/IGuessPaper.model";
import { useState } from "react";
import Loader from "../../common/Loader";
import TokenSymbol from "../../common/TokenSymbol";

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
      {guesses.length === 0 ? (
        <div className="text-sm">
          <p>{"You have not made any guesses yet."}</p>
        </div>
      ) : (
        <div className="rounded-md gradient-white p-2 border border-primary flex justify-around">
          <div className="flex flex-col justify-center items-start">
            <p>{"Total Odds"}</p>
            {totalOdds}
          </div>
          <div className="flex flex-col justify-center items-start">
            <p>{"Stakes"}</p>
            <select
              defaultValue={50}
              className="p-2 rounded-md text-black"
              onChange={(e) => setStake(Number(e.target.value))}
            >
              <option>50</option>
              <option>100</option>
              <option>200</option>
              <option>500</option>
              <option>1000</option>
              <option>10000</option>
              <option>50000</option>
            </select>
          </div>

          <div className="flex flex-col justify-center items-start">
            <p>{"Wins"}</p>
            <p className="flex">
              {wins}
              <TokenSymbol color="white" />
            </p>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <button
              className="gradient-primary text-white py-1 px-2 rounded-sm self-center"
              onClick={() => sendGuessPaper()}
            >
              CREATE
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ActiveGuessPaper;
