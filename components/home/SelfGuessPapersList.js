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
        setPaging({
          page: response.data.page.number,
          size: response.data.page.size,
          totalPages: response.data.page.totalPages,
          totalElements: response.data.page.totalElements,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paging.page]);

  const selfGuessPapersRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (selfGuessPapers.length === 0) {
      return <p className="text-primary">No guess papers available.</p>;
    } else {
      return (
        <div className="w-full">
          <div className="bg-background flex justify-start items-center text-primary border-b border-primary">
            <h2 className="flex-1">{t("username")}</h2>
            <h2 className="flex-1">{t("status")}</h2>
            <h2 className="flex-1">{t("stakes")}</h2>
            <h2 className="flex-1">{t("optionOdds")}</h2>
            <h2 className="flex-1">{t("wins")}</h2>
            <h2 className="flex-1">{t("details")}</h2>
          </div>
          {selfGuessPapers.map((guessPaper) => (
            <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
          ))}
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text="Self Guess Papers" />
      {selfGuessPapersRenderer()}
    </div>
  );
};

export default SelfGuessPapersList;
