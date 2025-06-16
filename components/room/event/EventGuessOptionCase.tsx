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
      className="flex flex-col justify-center items-center hover:cursor-pointer m-0.5 w-full border-2 border-primary rounded-md"
      onClick={() => {
        handleOptionSelected({
          event: event,
          eventGuessOption: eventGuessOption,
          eventGuessOptionCase: eventGuessOptionCase,
        });
      }}
    >
      <div className={`w-full flex justify-start items-center ${guesses.some((guess) => guess.eventGuessOptionCaseId === eventGuessOptionCase.id) ? "gradient-primary text-white" : "gradient-white text-black"} p-2`}>
        <p className="truncate font-bold">{eventGuessOptionCase.name}</p>
      </div>
    </button>
  );
};

export default EventGuessOptionCase;
