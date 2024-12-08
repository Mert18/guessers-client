import { useState, useEffect } from "react";
import { getActiveEvents } from "@/api/event";
import { IPaging } from "@/types/IRequest.model";

interface IUseActiveEventsProps {
  roomId: string;
}

export const useActiveEvents = ({roomId}: IUseActiveEventsProps) => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState<IPaging>({ page: 0, size: 5, totalPages: 0 });

  useEffect(() => {
    const fetchActiveEvents = async () => {
      if (!roomId) return;

      setLoading(true);
      try {
        const response = await getActiveEvents({roomId: roomId, paging: paging});
        setActiveEvents(response?.data?.content);
        setPaging({
          page: response?.data?.page.number,
          size: response?.data?.page.size,
          totalPages: response?.data?.page.totalPages,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchActiveEvents();
  }, [roomId, paging.page]);

  return { activeEvents, loading, paging, setPaging };
};
