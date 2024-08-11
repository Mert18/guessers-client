"use client";
import { listRoomGuessPapersByStatus } from "@/api/guesspaper";
import React, { useEffect, useState } from "react";
import ComponentTitle from "../common/ComponentTitle";
import { t } from "i18next";
import GuessPaperCard from "../guesspaper/GuessPaperCard";
import Pagination from "../common/Pagination";
import Pager from "../common/Pager";

const RoomGuessPapers = ({ roomId }) => {
  const [guessPapers, setGuessPapers] = useState([]);
  const [filterParams, setFilterParams] = useState({});
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    page: 0,
    size: 2,
    totalElements: 0,
    totalPages: 0,
  });

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
    <div className="w-full my-4">
      <ComponentTitle text={t("guessPapers")} />
      {guessPapers?.length === 0 ? (
        <p className="text-primary">No Room guess papers available.</p>
      ) : loading ? (
        <Loader />
      ) : (
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
          <Pager paging={paging} setPaging={setPaging} />
        </div>
      )}
    </div>
  );
};

export default RoomGuessPapers;
