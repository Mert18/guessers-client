"use client";
import React, { useEffect, useState } from "react";
import EventCard from "../events/EventCard";
import GuessPaper from "../guesspaper/ActiveGuessPaper";
import ComponentTitle from "../common/ComponentTitle";
import { t } from "i18next";

const RoomActiveEvents = ({ activeEvents, roomUser }) => {
  const [guesses, setGuesses] = useState([]);

  const [totalOdds, setTotalOdds] = useState(1.0);
  const [stake, setStake] = useState(100);
  const [wins, setWins] = useState(100);

  useEffect(() => {
    setTotalOdds(guesses.reduce((acc, guess) => acc * guess.odd, 1).toFixed(2));
    setWins(
      (
        guesses.reduce((acc, guess) => acc * guess.odd, 1).toFixed(2) * stake
      ).toFixed(2)
    );
  }, [guesses, stake]);

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

  const resetGuessPaper = () => {
    setStake(100);
    setWins(100);
    setTotalOdds(1.0);
    setGuesses([]);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <ComponentTitle text={t("activeEvents")} />
      <div className="w-1/2">
        {activeEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            handleOptionSelected={handleOptionSelected}
            guesses={guesses}
            roomUser={roomUser}
          />
        ))}
      </div>

      {guesses.length > 0 && (
        <GuessPaper
          guesses={guesses}
          totalOdds={totalOdds}
          stake={stake}
          setStake={setStake}
          wins={wins}
          roomUser={roomUser}
          resetGuessPaper={resetGuessPaper}
        />
      )}
    </div>
  );
};

export default RoomActiveEvents;
