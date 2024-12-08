import { IGuessPaper } from "@/types/IGuessPaper.model";
import GuessPaperGuess from "./GuessPaperGuess";
import GuessPaperMetadata from "./GuessPaperMetadata";

interface IGuessPaperDetailsProps {
  guessPaper: IGuessPaper
}

const GuessPaperDetails = ({ guessPaper }: IGuessPaperDetailsProps) => {
  return (
    <>
    <div className="w-full text-xs">
      <div className="bg-primary-default p-2 flex justify-start items-center text-background-bright font-bold border-2 border-primary-default">
        <h2 className="flex-1">{"Event"}</h2>
        <h2 className="flex-1">{"Guess Option"}</h2>
        <h2 className="flex-1">{"Guess"}</h2>
        <h2 className="flex-1">{"Odds"}</h2>
        <h2 className="flex-1">{"Status"}</h2>
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
