"use client";
import { createEventFromReadyEvent } from "@/api/event";
import { getReadyEvents } from "@/api/readyevent";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IReadyEvent } from "@/types/IReadyEvent.model";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import CustomButton from "@/components/common/CustomButton";
import { convertToUserTimeZone } from "@/util/dateUtil";

const leagues = [
  {
    name: "UEFA Champions League",
    key: 0,
  },
  {
    name: "UEFA Europe League",
    key: 1,
  },
  {
    name: "Turkish Super League",
    key: 2,
  },
  {
    name: "English Premier League",
    key: 3,
  },
  {
    name: "La Liga",
    key: 4,
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
  const [selectedLeague, setSelectedLeague] = useState<number>(0);
  const [readyEvents, setReadyEvents] = useState<IReadyEvent[]>([]);
  const [readyEventIdsToCreate, setReadyEventIdsToCreate] = useState<string[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchReadyEvents = (selectedLeague: number) => {
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
    if (!selectedLeague && selectedLeague !== 0) return;
    fetchReadyEvents(selectedLeague);
  }, [selectedLeague]);

  const handleCreateEventFromReadyEvent = () => {
    if (readyEventIdsToCreate.length === 0) {
      toast.error("Please select at least one event to create.");
      return;
    }

    setLoading(true);
    createEventFromReadyEvent({
      roomId,
      readyEventIds: readyEventIdsToCreate,
    }).finally(() => {
      setLoading(false);
      handleCloseReadyEventModal();
      setTimeout(() => {
        router.push(`/home/room/${roomId}/guess`);
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
                ? "gradient-primary text-white rounded-md"
                : "text-black"
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
          readyEvents?.map((readyEvent) => (
            <button
              key={readyEvent.id}
              className={`${
                readyEventIdsToCreate.includes(readyEvent.id)
                  ? "gradient-primary text-white rounded-md"
                  : "text-black"
              } flex flex-col justify-center items-center w-full py-2 cursor-pointer my-1`}
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
              <p>{convertToUserTimeZone(readyEvent.commenceTime)}</p>
            </button>
          ))
        )}
      </div>
      <CustomButton
        type="submit"
        text="Create Selected Events"
        onClick={() => handleCreateEventFromReadyEvent()}
      />
    </div>
  );
};

export default ListReadyEvents;
