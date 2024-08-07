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
        console.log("Response: ", response.data.content);
        setGuessPapers(response.data.content);
      }
    );
  }, [roomId]);
  return (
    <div className="flex flex-col justify-center items-center">
      <ComponentTitle text={t("guessPapers")} />
      <div className="w-1/2">
        {guessPapers.map((guessPaper) => (
          <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
        ))}
      </div>
    </div>
  );
};

export default RoomGuessPapers;
