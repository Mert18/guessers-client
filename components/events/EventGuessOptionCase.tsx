import {
  IEvent,
  IEventGuessOption,
  IEventGuessOptionCase,
} from "@/types/IEvent.model";
import { ICreateGuessPaperGuess } from "@/types/IGuessPaper.model";

interface IEventGuessOptionCaseProps {
  event: IEvent;
  eventGuessOption: IEventGuessOption;
  eventGuessOptionCase: IEventGuessOptionCase;
  handleOptionSelected: (
    event: IEvent,
    eventGuessOption: IEventGuessOption,
    eventGuessOptionCase: IEventGuessOptionCase
  ) => void;
  guesses: ICreateGuessPaperGuess[];
}

const EventGuessOptionCase = ({
  event,
  eventGuessOption,
  eventGuessOptionCase,
  handleOptionSelected,
  guesses,
}: IEventGuessOptionCaseProps) => {
  return (
    <button
      key={eventGuessOptionCase.id}
      className="flex-1 flex flex-col justify-center items-center hover:cursor-pointer"
      onClick={() => {
        handleOptionSelected(event, eventGuessOption, eventGuessOptionCase);
      }}
    >
      <div className="text-text w-full flex justify-center items-center border-b border-primary_accent py-2">
        <p className="truncate">{eventGuessOptionCase.name}</p>
      </div>
      <div
        className={`${
          guesses.findIndex(
            (guess) => guess.eventGuessOptionCaseId === eventGuessOptionCase.id
          ) >= 0
            ? "bg-primary text-background"
            : "text-primary bg-background"
        } w-full py-2 m-1 flex justify-evenly items-center font-bold`}
      >
        <p>{eventGuessOptionCase.odds}</p>
      </div>
    </button>
  );
};

export default EventGuessOptionCase;
