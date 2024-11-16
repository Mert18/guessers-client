import { ISingleGuess } from "@/types/IGuessPaper.model";

interface IGuessPaperGuessProps {
  guess: ISingleGuess;
}

const GuessPaperGuess = ({ guess }: IGuessPaperGuessProps) => {
  return (
    <div
      className="flex w-full border-b border-primary"
    >
      <p className="flex-1 truncate">{guess.event.name}</p>
      <p className="flex-1">{guess.eventGuessOption.name}</p>
      <p className="flex-1">{guess.eventGuessOptionCase.name}</p>
      <p className="flex-1">{guess.eventGuessOptionCase.odds}</p>
      <p className="flex-1">{guess.eventGuessOptionCase.status}</p>
    </div>
  );
};

export default GuessPaperGuess;
