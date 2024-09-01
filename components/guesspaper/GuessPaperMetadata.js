import React from "react";
import { t } from "i18next";

const GuessPaperMetadata = ({ guessPaper }) => {
  return (
    <div className="w-full my-4">
      <div className="flex justify-between w-full">
        <p>Status</p>
        <p>{guessPaper.status}</p>
      </div>
      <div className="flex justify-between w-full">
        <p>{t("username")}</p>
        <p>{guessPaper.user.username}</p>
      </div>
      <div className="flex justify-between w-full">
        <p>{t("totalOdds")}</p>
        <p>{guessPaper.totalOdd}</p>
      </div>
      <div className="flex justify-between w-full">
        <p>{t("stakes")}</p>
        <p>{guessPaper.stake}</p>
      </div>
      <div className="flex justify-between w-full">
        <p>{t("wins")}</p>
        <p>{guessPaper.wins}</p>
      </div>
    </div>
  );
};

export default GuessPaperMetadata;
