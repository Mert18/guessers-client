import { IEvent, IEventGuessOption } from "@/types/IEvent.model";
import EventGuessOptionCase from "./EventGuessOptionCase";
import { ICreateGuessPaperGuess, IHandleOptionSelected } from "@/types/IGuessPaper.model";

interface IEventGuessOptionProps {
  event: IEvent;
  eventGuessOption: IEventGuessOption;
  handleOptionSelected: ({ event, eventGuessOption, eventGuessOptionCase}: IHandleOptionSelected) => void;
  guesses: ICreateGuessPaperGuess[];
}

const EventGuessOption = ({
  event,
  eventGuessOption,
  handleOptionSelected,
  guesses,
}: IEventGuessOptionProps) => {
  return (
    <div
      key={eventGuessOption.id}
      className="flex flex-col justify-start items-start w-full"
    >
      <p className="my-0.5 font-bold text-primary-dark rounded-md">{eventGuessOption.name}</p>
      {event.status === "IN_PROGRESS" && (
        <div className="w-full grid grid-cols-2 gap-x-1">
          {eventGuessOption.eventGuessOptionCases?.map(
            (eventGuessOptionCase) => (
              <EventGuessOptionCase
                key={eventGuessOptionCase.id}
                event={event}
                eventGuessOption={eventGuessOption}
                eventGuessOptionCase={eventGuessOptionCase}
                handleOptionSelected={handleOptionSelected}
                guesses={guesses}
              />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default EventGuessOption;
