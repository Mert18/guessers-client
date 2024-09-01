import React from "react";
import GuessPaperGuess from "./GuessPaperGuess";
import GuessPaperMetadata from "./GuessPaperMetadata";

const GuessPaperDetails = ({guessPaper}) => {
  return (
    <>
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
      <GuessPaperMetadata guessPaper={guessPaper} />
    </>
  );
};

export default GuessPaperDetails;
