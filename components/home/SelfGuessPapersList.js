"use client";
import { listSelfGuessPapers } from "@/api/guesspaper";
import React, { useEffect, useState } from "react";
import ComponentTitle from "../common/ComponentTitle";
import GuessPaperCard from "../guesspaper/GuessPaperCard";
import { t } from "i18next";
import Loader from "../common/Loader";

const GuessPaperStatusEnum = {
  IN_PROGRESS: "IN_PROGRESS",
  WON: "WON",
  LOST: "LOST",
  CANCELLED: "CANCELLED",
};

const SelfGuessPapersList = ({ statuses }) => {
  const [selfGuessPapers, setSelfGuessPapers] = useState([]);
  const [paging, setPaging] = useState({ page: 0, size: 5 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const listSelfGuessPaperRequest = {
      statuses: [
        GuessPaperStatusEnum.IN_PROGRESS,
        GuessPaperStatusEnum.WON,
        GuessPaperStatusEnum.LOST,
        GuessPaperStatusEnum.CANCELLED,
      ],
    };
    listSelfGuessPapers(listSelfGuessPaperRequest, paging)
      .then((response) => {
        setSelfGuessPapers(response.data.content);
        setPaging((prevState) => ({
          ...prevState,
          totalPages: response.data.page.totalPages,
          totalElements: response.data.page.totalElements,
        }));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paging.page]);

  return (
    <div className="w-full my-4">
      <ComponentTitle text="Self Guess Papers" />
      {selfGuessPapers === undefined ? (
        <p className="text-primary">No guess papers available.</p>
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
          {selfGuessPapers.map((guessPaper) => (
            <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SelfGuessPapersList;
