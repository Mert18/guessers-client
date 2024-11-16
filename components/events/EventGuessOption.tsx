import { IEvent, IEventGuessOption } from "@/types/IEvent.model";
import EventGuessOptionCase from "./EventGuessOptionCase";
import { ICreateGuessPaperGuess } from "@/types/IGuessPaper.model";

interface IEventGuessOptionProps {
  event: IEvent;
  eventGuessOption: IEventGuessOption;
  handleOptionSelected: (eventGuessOptionCaseId: number) => void;
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
      className="w-full flex flex-col justify-start items-start"
    >
      <p className="text-text text-xs lowercase my-1">{eventGuessOption.name}</p>
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
