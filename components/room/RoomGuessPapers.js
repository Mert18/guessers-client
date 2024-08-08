"use client";
import { listRoomGuessPapersByStatus } from "@/api/guesspaper";
import React, { useEffect, useState } from "react";
import ComponentTitle from "../common/ComponentTitle";
import { t } from "i18next";
import GuessPaperCard from "../guesspaper/GuessPaperCard";
import Pagination from "../common/Pagination";

const RoomGuessPapers = ({ roomId }) => {
  const [guessPapers, setGuessPapers] = useState([]);
  const [filterParams, setFilterParams] = useState({});
  const [paging, setPaging] = useState({ page: 0, size: 2, totalElements: 0, totalPages: 0 });

  useEffect(() => {
    if (!roomId) return;
    listRoomGuessPapersByStatus(filterParams, roomId, paging).then(
      (response) => {
        setGuessPapers(response.data.content);
        setPaging({
          page: response.data.page.number,
          size: response.data.page.size,
          totalElements: response.data.page.totalElements,
          totalPages: response.data.page.totalPages,
        });
      }
    );
  }, [roomId, paging.page, filterParams]);

  return (
    <div className="flex flex-col justify-center items-center">
      <ComponentTitle text={t("guessPapers")} />
      <div className="w-1/2">
        {guessPapers.map((guessPaper) => (
          <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
        ))}
      </div>

      <Pagination paging={paging} setPaging={setPaging} />
    </div>
  );
};

export default RoomGuessPapers;
