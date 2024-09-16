"use client";
import { getRoomUser } from "@/api/room";
import ActiveGuessPaper from "@/components/guesspaper/ActiveGuessPaper";
import RoomActiveEvents from "@/components/room/RoomActiveEvents";
import React, { useEffect, useState } from "react";

const RoomGuess = ({params}) => {
  const [guesses, setGuesses] = useState([]);
  const [totalOdds, setTotalOdds] = useState(1.0);
  const [stake, setStake] = useState(100);
  const [wins, setWins] = useState(100);
  const [loading, setLoading] = useState(false);
  
  const [roomUser, setRoomUser] = useState(null);

  const resetGuessPaper = () => {
    setStake(100);
    setWins(100);
    setTotalOdds(1.0);
    setGuesses([]);
  };

  const handleOptionSelected = (
    event,
    eventGuessOption,
    eventGuessOptionCase
  ) => {
    const guessSignature = `${event.id}-${eventGuessOption.id}`;
    const guess = {
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
        .eventGuessOptionCaseId
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
    setTotalOdds(guesses.reduce((acc, guess) => acc * guess.odd, 1).toFixed(2));
    setWins(
      (
        guesses.reduce((acc, guess) => acc * guess.odd, 1).toFixed(2) * stake
      ).toFixed(2)
    );
  }, [guesses, stake]);

  useEffect(() => {
    const fetchRoomUser = async () => {
      setLoading(true);
      try {
        const userResponse = await getRoomUser(params.roomId);
        setRoomUser(userResponse.data);
      } catch (error) {
        console.error("Failed to fetch room user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomUser();
  }, [params.roomId]);

  return (
    <div>
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
    </div>
  );
};

export default RoomGuess;
