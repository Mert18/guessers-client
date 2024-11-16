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
      <div className="bg-background flex justify-start items-center text-primary border-b border-primary">
        <h2 className="flex-1">{"event"}</h2>
        <h2 className="flex-1">{"guessOption"}</h2>
        <h2 className="flex-1">{"guess"}</h2>
        <h2 className="flex-1">{"odds"}</h2>
        <h2 className="flex-1">{"status"}</h2>
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
