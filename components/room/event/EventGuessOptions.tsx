import { IEvent, IEventGuessOption } from "@/types/IEvent.model";
import EventGuessOption from "./EventGuessOption";
import { ICreateGuessPaperGuess, IHandleOptionSelected } from "@/types/IGuessPaper.model";

interface IEventGuessOptions {
  event: IEvent;
  eventGuessOptions: IEventGuessOption[];
  handleOptionSelected: ({ event, eventGuessOption, eventGuessOptionCase}: IHandleOptionSelected) => void;
  guesses: ICreateGuessPaperGuess[];
}

const EventGuessOptions = ({
  event,
  eventGuessOptions,
  handleOptionSelected,
  guesses,
}: IEventGuessOptions) => {
  return (
    <div className="w-full grid grid-cols-1 gap-5 p-2">
      {eventGuessOptions.map((eventGuessOption) => (
        <EventGuessOption
          key={eventGuessOption.id}
          event={event}
          eventGuessOption={eventGuessOption}
          handleOptionSelected={handleOptionSelected}
          guesses={guesses}
        />
      ))}
    </div>
  );
};

export default EventGuessOptions;
