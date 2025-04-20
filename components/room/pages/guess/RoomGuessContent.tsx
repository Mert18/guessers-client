"use client";
import { getRoomUser } from "@/api/room";
import ActiveGuessPaper from "@/components/room/guesspaper/ActiveGuessPaper";
import {
  ICreateGuessPaperGuess,
  IHandleOptionSelected,
} from "@/types/IGuessPaper.model";
import { IRoomUser } from "@/types/IRoom.model";
import { useEffect, useState } from "react";
import RoomActiveEvents from "./RoomActiveEvents";

interface IRoomGuessContentProps {
  params: { roomId: string };
}
const RoomGuessContent = ({ params }: IRoomGuessContentProps) => {
  const [guesses, setGuesses] = useState<ICreateGuessPaperGuess[]>([]);

  const [roomUser, setRoomUser] = useState<IRoomUser>();

  const resetGuessPaper = () => {
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
