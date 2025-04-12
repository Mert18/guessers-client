import {
  IEvent,
  IEventGuessOption,
  IEventGuessOptionCase,
} from "@/types/IEvent.model";
import {
  ICreateGuessPaperGuess,
  IHandleOptionSelected,
} from "@/types/IGuessPaper.model";

interface IEventGuessOptionCaseProps {
  event: IEvent;
  eventGuessOption: IEventGuessOption;
  eventGuessOptionCase: IEventGuessOptionCase;
  handleOptionSelected: ({
    event,
    eventGuessOption,
    eventGuessOptionCase,
  }: IHandleOptionSelected) => void;
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
      className="flex flex-col justify-center items-center hover:cursor-pointer m-0.5 w-full"
      onClick={() => {
        handleOptionSelected({
          event: event,
          eventGuessOption: eventGuessOption,
          eventGuessOptionCase: eventGuessOptionCase,
        });
      }}
    >
      <div className="text-text w-full flex justify-start items-center py-2">
        <p className="truncate font-bold">{eventGuessOptionCase.name}</p>
      </div>
      <div
        className={`${
          guesses.findIndex(
            (guess) => guess.eventGuessOptionCaseId === eventGuessOptionCase.id
          ) >= 0
            ? "bg-primary text-background-bright"
            : "text-primary bg-background-bright"
        } w-full py-2 m-1 flex justify-evenly items-center font-bold border-2 border-primary`}
      >
        <p>{eventGuessOptionCase.odds}</p>
      </div>
    </button>
  );
};

export default EventGuessOptionCase;
