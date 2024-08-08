import React, { useState } from "react";
import Modal from "../Modal";
import SecondaryButton from "../common/button/SecondaryButton";
import { t } from "i18next";

const GuessPaperCard = ({ guessPaper }) => {
  const [guessPaperDetailsOpen, setGuessPaperDetailsOpen] = useState(false);

  const handleCloseDetails = () => {
    setGuessPaperDetailsOpen(false);
  };

  return (
    <div
      className={`text-text my-2 bg-opacity-50 border border-background3 rounded-md p-2 ${
        guessPaper.status === "WON"
          ? "bg-success"
          : guessPaper.status === "LOST"
          ? "bg-failure"
          : "bg-background"
      }`}
    >
      <div className="flex justify-evenly items-center">
        <p className="flex-1">{guessPaper.user.username}</p>
        <p className="flex-1">{guessPaper.status}</p>
        <p className="flex-1">{guessPaper.stake}</p>
        <p className="flex-1">{guessPaper.totalOdd}</p>
        <p className="flex-1">{guessPaper.wins}</p>
        <div className="flex-1">
          <SecondaryButton
            text="Details"
            onClick={() => setGuessPaperDetailsOpen(true)}
          />
        </div>
      </div>
      {guessPaperDetailsOpen && (
        <Modal
          title={t("guessPaperDetails")}
          handleCloseModal={handleCloseDetails}
        >
          <div className="flex flex-col justify-center items-center w-full">
            {guessPaper.guesses.map((guess) => (
              <div
                className="flex justify-between w-full border-b border-background3"
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
            <div className="w-full mt-10">
              <div className="flex justify-between w-full">
                <p>{t("status")}</p>
                <p
                  className={`${
                    guessPaper.status === "WON"
                      ? "text-success"
                      : guessPaper.status === "LOST"
                      ? "text-failure"
                      : "text-text"
                  }`}
                >
                  {guessPaper.status}
                </p>
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
