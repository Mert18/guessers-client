"use client";
import { listRoomGuessPapersByStatus } from "@/api/guesspaper";
import React, { useEffect, useState } from "react";
import ComponentTitle from "../common/ComponentTitle";
import { t } from "i18next";

const guessPaperStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
};

const RoomGuessPapers = ({ roomId }) => {
  const [guessPapers, setGuessPapers] = useState([]);
  const [status, setStatus] = useState("IN_PROGRESS");
  const [filterParams, setFilterParams] = useState({});
  const [paging, setPaging] = useState({ page: 0, size: 10 });

  useEffect(() => {
    if (!roomId) return;
    listRoomGuessPapersByStatus(filterParams, roomId, paging).then(
      (response) => {
        console.log("Response: ", response.data.content)
        setGuessPapers(response.data.content);
      }
    );
  }, [roomId]);
  return (
    <div className="flex flex-col justify-center items-center">
      <ComponentTitle text={t("guessPapers")} />
      <div className="w-1/2">
        {guessPapers.map((guessPaper) => (
          <div key={guessPaper.id} className="text-text m-2 bg-background2 p-2">
            <p><span className="font-bold">{t("username")}</span>: {guessPaper.user.username}</p>
            <p><span className="font-bold">{t("status")}</span>:{guessPaper.status}</p>
            <p><span className="font-bold">{t("stake")}</span>:{guessPaper.stake}</p>
            <p><span className="font-bold">{t("totalOdds")}</span>:{guessPaper.totalOdd}</p>
            <p><span className="font-bold">{t("wins")}</span>:{guessPaper.wins}</p>
            <div>
              {guessPaper.guesses.map((guess) => (
                <div>
                  <p><span className="font-bold">{t("event")}</span>: {guess.event.name}</p>
                  <p><span className="font-bold">{guess.eventGuessOption.name}</span></p>
                  <p><span className="font-bold">{t("eventGuessOptionCase")}</span>: {guess.eventGuessOptionCase.name}</p>
                  <p><span className="font-bold">{t("odd")}</span>: {guess.eventGuessOptionCase.odds}</p>
                  </div>
              ))}
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomGuessPapers;
