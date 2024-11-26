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
      className="flex flex-col justify-start items-start"
    >
      <p className="text-background-bright bg-primary-default p-2 rounded-md text-xs lowercase my-1 font-bold">{eventGuessOption.name}</p>
      {event.status === "IN_PROGRESS" && (
        <div className="w-full grid auto-cols-fr grid-flow-col">
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
