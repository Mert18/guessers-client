"use client";
import { listRoomGuessPapersByStatus } from "@/api/guesspaper";
import { getRoomPrizes } from "@/api/prize";
import { getRoomUser } from "@/api/room";
import ActiveGuessPaper from "@/components/guesspaper/ActiveGuessPaper";
import RoomActiveEvents from "@/components/room/RoomActiveEvents";
import RoomGuessPapers from "@/components/room/RoomGuessPapers";
import RoomHeader from "@/components/room/RoomHeader";
import RoomPrizes from "@/components/room/RoomPrizes";
import React, { useEffect, useState } from "react";

const Room = ({ params }) => {
  const [roomUser, setRoomUser] = useState({});

  const [roomGuessPapers, setRoomGuessPapers] = useState([]);
  const [roomGuessPapersLoading, setRoomGuessPapersLoading] = useState(false);
  const [roomGuessPapersPaging, setRoomGuessPapersPaging] = useState({
    page: 0,
    size: 5,
  });
  const [roomPrizes, setRoomPrizes] = useState([]);
  const [roomPrizesPaging, setRoomPrizesPaging] = useState({
    page: 0,
    size: 5,
  });
  const [roomPrizesLoading, setRoomPrizesLoading] = useState(false);

  const [guesses, setGuesses] = useState([]);
  const [totalOdds, setTotalOdds] = useState(1.0);
  const [stake, setStake] = useState(100);
  const [wins, setWins] = useState(100);

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

  const fetchRoomUser = async (roomId) => {
    if (roomId === undefined) return;
    const response = await getRoomUser(roomId);
    setRoomUser(response.data);
  };

  const fetchGuessPapers = async (roomId) => {
    try {
      setRoomGuessPapersLoading(true);
      const response = await listRoomGuessPapersByStatus(
        roomId,
        roomGuessPapersPaging
      );
      setRoomGuessPapers(response.data.content);
    } catch (error) {
      console.error("fetchGuessPapers error: ", error);
    } finally {
      setRoomGuessPapersLoading(false);
    }
  };

  const fetchPrizes = async (roomId) => {
    try {
      setRoomPrizesLoading(true);
      getRoomPrizes(roomId, roomPrizesPaging, true).then((response) => {
        setRoomPrizes(response.data.content);
      });
    } catch (error) {
      console.error("fetchPrizes error: ", error);
    }
  };

  useEffect(() => {
    if (params.roomId === undefined) return;
    fetchRoomUser(params.roomId);
    fetchGuessPapers(params.roomId);
    fetchPrizes(params.roomId);
  }, []);

  useEffect(() => {
    if (params.roomId === undefined) return;
    fetchRoomUser(params.roomId);
    fetchGuessPapers(params.roomId);
    fetchPrizes(params.roomId);
  }, [params.roomId]);

  useEffect(() => {
    setTotalOdds(guesses.reduce((acc, guess) => acc * guess.odd, 1).toFixed(2));
    setWins(
      (
        guesses.reduce((acc, guess) => acc * guess.odd, 1).toFixed(2) * stake
      ).toFixed(2)
    );
  }, [guesses, stake]);

  return (
    <div className="w-full">
      {roomUser && (
        <div className="flex flex-col w-full">
          <RoomHeader roomId={params.roomId} roomUser={roomUser} />

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

          <RoomGuessPapers
            roomId={params.roomId}
            guessPapers={roomGuessPapers}
            paging={roomGuessPapersPaging}
            setPaging={setRoomGuessPapersPaging}
            loading={roomGuessPapersLoading}
          />

          <RoomPrizes prizes={roomPrizes} roomId={params.roomId} />
        </div>
      )}
    </div>
  );
};

export default Room;
