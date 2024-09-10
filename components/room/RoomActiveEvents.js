"use client";
import React, { useEffect, useState } from "react";
import EventCard from "../events/EventCard";
import ComponentTitle from "../common/ComponentTitle";
import { t } from "i18next";
import Loader from "../common/Loader";
import { getActiveEvents } from "@/api/event";
import Pager from "../common/Pager";
import ActiveGuessPaper from "../guesspaper/ActiveGuessPaper";

const RoomActiveEvents = ({ roomId, roomUser }) => {
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [activeEvents, setActiveEvents] = useState([]);

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

  useEffect(() => {
    setLoading(true);
    getActiveEvents(roomId, paging)
      .then((response) => {
        setActiveEvents(response.data.content);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [roomId, paging.page]);

  const eventsRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (activeEvents.length === 0) {
      return <p className="text-primary">No active events available.</p>;
    } else {
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

          <ComponentTitle text={t("activeEvents")} icon="/calendar.svg" />
          {activeEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              handleOptionSelected={handleOptionSelected}
              guesses={guesses}
              roomUser={roomUser}
              status="IN_PROGRESS"
            />
          ))}
          <Pager paging={paging} setPaging={setPaging} />
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      {eventsRenderer()}
    </div>
  );
};

export default RoomActiveEvents;
