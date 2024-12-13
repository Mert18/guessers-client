"use client";
import { getRoomUser } from "@/api/room";
import ActiveGuessPaper from "@/components/guesspaper/ActiveGuessPaper";
import {
  ICreateGuessPaperGuess,
  IHandleOptionSelected,
} from "@/types/IGuessPaper.model";
import { IRoomUser } from "@/types/IRoom.model";
import React, { useEffect, useState } from "react";
import RoomActiveEvents from "../RoomActiveEvents";

interface IRoomGuessContentProps {
  params: { roomId: string };
}
const RoomGuessContent = ({ params }: IRoomGuessContentProps) => {
  const [guesses, setGuesses] = useState<ICreateGuessPaperGuess[]>([]);
  const [totalOdds, setTotalOdds] = useState<number>(1.0);
  const [stake, setStake] = useState<number>(100);
  const [wins, setWins] = useState<number>(100);

  const [roomUser, setRoomUser] = useState<IRoomUser>();

  const resetGuessPaper = () => {
    setStake(100);
    setWins(100);
    setTotalOdds(1.0);
    setGuesses([]);
  };

  const handleOptionSelected = ({
    event,
    eventGuessOption,
    eventGuessOptionCase,
  }: IHandleOptionSelected) => {
    if (
      event?.id === undefined ||
      eventGuessOption?.id === undefined ||
      eventGuessOptionCase.id === undefined
    )
      return;
    const guessSignature = `${event.id}-${eventGuessOption.id}`;
    const guess: ICreateGuessPaperGuess = {
      eventId: event.id,
      eventGuessOptionId: eventGuessOption.id,
      eventGuessOptionName: eventGuessOption.name,
      eventGuessOptionCaseId: eventGuessOptionCase.id,
      eventGuessOptionCaseName: eventGuessOptionCase.name,
      odd: eventGuessOptionCase.odds,
      signature: guessSignature,
    };

    if (
      guesses.findIndex((guess) => guess.signature === guessSignature) === -1
    ) {
      setGuesses([...guesses, guess]);
    } else if (
      eventGuessOptionCase.id ===
      guesses.find((guess) => guess.signature === guessSignature)
        ?.eventGuessOptionCaseId
    ) {
      const newGuesses = [...guesses];
      newGuesses.splice(
        guesses.findIndex((guess) => guess.signature === guessSignature),
        1
      );
      setGuesses(newGuesses);
      return;
    } else {
      const newGuesses = [...guesses];
      newGuesses[
        guesses.findIndex((guess) => guess.signature === guessSignature)
      ] = guess;
      setGuesses(newGuesses);
    }
  };

  useEffect(() => {
    setTotalOdds(
      Number(guesses.reduce((acc, guess) => acc * guess.odd, 1).toFixed(2))
    );
    setWins(
      Number(
        (
          Number(
            guesses.reduce((acc, guess) => acc * guess.odd, 1).toFixed(2)
          ) * stake
        ).toFixed(2)
      )
    );
  }, [guesses, stake]);

  useEffect(() => {
    const fetchRoomUser = async () => {
      const userResponse = await getRoomUser(params.roomId);
      setRoomUser(userResponse.data);
    };

    fetchRoomUser();
  }, [params.roomId]);

  return (
    <div>
      {roomUser && (
        <>
          <ActiveGuessPaper
            guesses={guesses}
            totalOdds={totalOdds}
            stake={stake}
            setStake={setStake}
            wins={wins}
            roomUser={roomUser}
            resetGuessPaper={resetGuessPaper}
          />

          <RoomActiveEvents
            roomId={params.roomId}
            roomUser={roomUser}
            handleOptionSelected={handleOptionSelected}
            guesses={guesses}
          />
        </>
      )}
    </div>
  );
};

export default RoomGuessContent;
