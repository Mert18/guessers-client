import React, { useState } from "react";
import Modal from "../Modal";
import { t } from "i18next";
import PrimaryButton from "../common/button/PrimaryButton";

const GuessPaperCard = ({ guessPaper }) => {
  const [guessPaperDetailsOpen, setGuessPaperDetailsOpen] = useState(false);

  const handleCloseDetails = () => {
    setGuessPaperDetailsOpen(false);
  };

  return (
    <div className="w-full text-text">
      <div className="bg-background flex justify-start items-center text-text border-b border-primary">
        <p className="flex-1">{guessPaper.user.username}</p>
        <p className="flex-1">{guessPaper.status}</p>
        <p className="flex-1">{guessPaper.stake.toFixed(2)}</p>
        <p className="flex-1">{guessPaper.totalOdd.toFixed(2)}</p>
        <p className="flex-1">{guessPaper.wins.toFixed(2)}</p>
        <div className="flex-1">
          <PrimaryButton
            text="Details"
            onClick={() => setGuessPaperDetailsOpen(true)}
            noBg={true}
          />
        </div>
      </div>
      {guessPaperDetailsOpen && (
        <Modal
          title={t("guessPaperDetails")}
          handleCloseModal={handleCloseDetails}
        >
          <div className="w-full">
            <div className="bg-background flex items-center text-primary border-b border-primary w-full">
              <h2 className="flex-1">{t("event")}</h2>
              <h2 className="flex-1">{t("caseOptionName")}</h2>
              <h2 className="flex-1">{t("caseName")}</h2>
              <h2 className="flex-1">{t("odds")}</h2>
              <h2 className="flex-1">{t("status")}</h2>
            </div>
            {guessPaper.guesses.map((guess) => (
              <div
                className="flex w-full border-b border-primary"
                key={
                  guess.event.id +
                  guess.eventGuessOption.id +
                  guess.eventGuessOptionCase.id
                }
              >
                <p className="flex-1">{guess.event.name}</p>
                <p className="flex-1">{guess.eventGuessOption.name}</p>
                <p className="flex-1">{guess.eventGuessOptionCase.name}</p>
                <p className="flex-1">{guess.eventGuessOptionCase.odds}</p>
                <p className="flex-1">{guess.eventGuessOptionCase.status}</p>
              </div>
            ))}
            <div className="w-full">
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
          </div>
        </Modal>
      )}
    </div>
  );
};

export default GuessPaperCard;
