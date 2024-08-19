import React from "react";
import ComponentTitle from "../common/ComponentTitle";
import GuessPaperCard from "../guesspaper/GuessPaperCard";
import { t } from "i18next";
import Loader from "../common/Loader";

const SelfGuessPapersList = ({
  selfGuessPapers,
  paging,
  setPaging,
  loading,
}) => {
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
