import React from "react";
import GuessPaperGuess from "./GuessPaperGuess";
import GuessPaperMetadata from "./GuessPaperMetadata";
import { t } from "i18next";

const GuessPaperDetails = ({ guessPaper }) => {
  return (
    <>
    <div className="w-full text-xs">
      <div className="bg-background flex justify-start items-center text-primary border-b border-primary">
        <h2 className="flex-1">{t("event")}</h2>
        <h2 className="flex-1">{t("guessOption")}</h2>
        <h2 className="flex-1">{t("guess")}</h2>
        <h2 className="flex-1">{t("odds")}</h2>
        <h2 className="flex-1">{t("status")}</h2>
      </div>
      {guessPaper.guesses.map((guess) => (
        <GuessPaperGuess
          key={
            guess.event.id +
            guess.eventGuessOption.id +
            guess.eventGuessOptionCase.id
          }
          guess={guess}
        />
      ))}
      </div>
      <GuessPaperMetadata guessPaper={guessPaper} />
    </>
  );
};

export default GuessPaperDetails;
