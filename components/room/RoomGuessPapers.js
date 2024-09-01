import React from "react";
import ComponentTitle from "../common/ComponentTitle";
import { t } from "i18next";
import GuessPaperCard from "../guesspaper/GuessPaperCard";
import Loader from "../common/Loader";

const RoomGuessPapers = ({ guessPapers, paging, setPaging, loading }) => {

  const roomGuessPapersRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (guessPapers.length === 0) {
      return <p className="text-primary">No Room guess papers available.</p>;
    } else {
      return (
        <div className="w-full">
          <div className="bg-background flex justify-start items-center text-primary border-b border-primary text-xs">
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
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text={t("guessPapers")} icon="/ticket.svg" />
      {roomGuessPapersRenderer()}
    </div>
  );
};

export default RoomGuessPapers;
