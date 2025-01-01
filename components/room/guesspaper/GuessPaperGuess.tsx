import TableCardWrapper from "@/components/common/table/TableCardWrapper";
import { ISingleGuess } from "@/types/IGuessPaper.model";

interface IGuessPaperGuessProps {
  guess: ISingleGuess;
}

const GuessPaperGuess = ({ guess }: IGuessPaperGuessProps) => {
  return (
    <TableCardWrapper changeBgOnHover={false}>
      <p className="flex-1 truncate">{guess.event.name}</p>
      <p className="flex-1">{guess.eventGuessOption.name}</p>
      <p className="flex-1">{guess.eventGuessOptionCase.name}</p>
      <p className="flex-1">{guess.eventGuessOptionCase.status}</p>
    </TableCardWrapper>
  );
};

export default GuessPaperGuess;
