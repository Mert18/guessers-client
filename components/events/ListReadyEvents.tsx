"use client";
import { createEventFromReadyEvent } from "@/api/event";
import { getReadyEvents } from "@/api/readyevent";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";
import PrimaryButton from "../common/button/PrimaryButton";
import { IReadyEvent } from "@/types/IReadyEvent.model";

const leagues = [
  {
    name: "English Premier League",
    key: "soccer_epl",
  },
  {
    name: "Turkish Super League",
    key: "soccer_turkey_super_league",
  },
  {
    name: "UEFA Champions League",
    key: "soccer_uefa_champs_league",
  },
  {
    name: "UEFA Europe League",
    key: "soccer_uefa_europa_league",
  },
  {
    name: "Italy Serie A",
    key: "soccer_italy_serie_a",
  },
  {
    name: "Bundesliga",
    key: "soccer_germany_bundesliga",
  },
  {
    name: "Ligue 1",
    key: "soccer_france_ligue_one",
  },
];

interface IListReadyEventsProps {
  handleCloseReadyEventModal: () => void;
  roomId: string;
}

const ListReadyEvents = ({
  handleCloseReadyEventModal,
  roomId,
}: IListReadyEventsProps) => {
  const [selectedLeague, setSelectedLeague] = useState<string>("soccer_epl");
  const [readyEvents, setReadyEvents] = useState<IReadyEvent[]>([]);
  const [readyEventIdsToCreate, setReadyEventIdsToCreate] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchReadyEvents = (selectedLeague: string) => {
    setLoading(true);
    getReadyEvents(selectedLeague)
      .then((response) => {
        setReadyEvents(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!selectedLeague) return;
    fetchReadyEvents(selectedLeague);
  }, [selectedLeague]);

  const handleCreateEventFromReadyEvent = () => {
    setLoading(true);
    createEventFromReadyEvent({
      roomId,
      readyEventIds: readyEventIdsToCreate,
    }).finally(() => {
      setLoading(false);
      handleCloseReadyEventModal();
      setTimeout(() => {
        router.push(`/home/room/${roomId}`);
      }, 1000);
    });
  };

  return (
    <div>
      <div className="flex flex-wrap justify-center">
        {leagues.map((league) => (
          <button
            className={`${
              selectedLeague === league.key
                ? "text-primary underline"
                : "text-text"
            } px-2`}
            key={league.key}
            onClick={() => setSelectedLeague(league.key)}
          >
            {league.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col justify-center items-center w-full py-4 max-h-[300px] overflow-y-auto my-4 scrollbar-thin">
        {loading ? (
          <Loader />
        ) : (
          readyEvents.map((readyEvent) => (
            <button
              key={readyEvent.id}
              className={`${
                readyEventIdsToCreate.includes(readyEvent.id)
                  ? "text-primary"
                  : "text-text"
              } flex flex-col justify-center items-center w-full py-2 cursor-pointer hover:text-primary my-1`}
              onClick={() => {
                if (readyEventIdsToCreate.includes(readyEvent.id)) {
                  setReadyEventIdsToCreate(
                    readyEventIdsToCreate.filter((id) => id !== readyEvent.id)
                  );
                } else {
                  setReadyEventIdsToCreate([
                    ...readyEventIdsToCreate,
                    readyEvent.id,
                  ]);
                }
              }}
            >
              <p>{readyEvent.name}</p>
            </button>
          ))
        )}
      </div>
      <PrimaryButton
        type="submit"
        text="Create Selected Events"
        onClick={() => handleCreateEventFromReadyEvent()}
      />
    </div>
  );
};

export default ListReadyEvents;
