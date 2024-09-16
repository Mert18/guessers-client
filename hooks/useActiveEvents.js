import { useState, useEffect } from "react";
import { getActiveEvents } from "@/api/event";

export const useActiveEvents = (roomId) => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({ page: 0, size: 5 });

  useEffect(() => {
    const fetchActiveEvents = async () => {
      if (!roomId) return;

      setLoading(true);
      try {
        const response = await getActiveEvents(roomId, paging);
        console.log("response:", response)
        setActiveEvents(response?.data?.content);
      } catch (error) {
        console.error("Error fetching active events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveEvents();
  }, [roomId, paging.page]);

  return { activeEvents, loading, paging, setPaging };
};
