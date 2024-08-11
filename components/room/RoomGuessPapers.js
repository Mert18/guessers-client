"use client";
import { listRoomGuessPapersByStatus } from "@/api/guesspaper";
import React, { useEffect, useState } from "react";
import ComponentTitle from "../common/ComponentTitle";
import { t } from "i18next";
import GuessPaperCard from "../guesspaper/GuessPaperCard";

const guessPaperStatus = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
};

const RoomGuessPapers = ({ roomId }) => {
  const [guessPapers, setGuessPapers] = useState([]);
  const [filterParams, setFilterParams] = useState({});
  const [paging, setPaging] = useState({ page: 0, size: 10 });

  useEffect(() => {
    if (!roomId) return;
    listRoomGuessPapersByStatus(filterParams, roomId, paging).then(
      (response) => {
        setGuessPapers(response.data.content);
      }
    );
  }, [roomId]);
  return (
    <div className="w-full my-4">
      <ComponentTitle text={t("guessPapers")} />
      <div className="w-full">
      <div className="bg-background flex justify-start items-center text-primary border-b border-primary">
            <h2 className="flex-1">{t("username")}</h2>
            <h2 className="flex-1">{t("status")}</h2>
            <h2 className="flex-1">{t("stakes")}</h2>
            <h2 className="flex-1">{t("odds")}</h2>
            <h2 className="flex-1">{t("wins")}</h2>
            <h2 className="flex-1">{t("details")}</h2>
          </div>
        {guessPapers.map((guessPaper) => (
          <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
        ))}
      </div>
    </div>
  );
};

export default RoomGuessPapers;
