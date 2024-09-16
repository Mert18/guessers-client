import { useState, useEffect } from "react";
import { getRoomPrizes } from "@/api/prize";

export const useRoomPrizes = (roomId, initialPaging) => {
  const [roomActivePrizes, setRoomActivePrizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState(initialPaging);

  useEffect(() => {
    const fetchRoomActivePrizes = async () => {
      if (!roomId) return;

      setLoading(true);
      try {
        const activePrizesResponse = await getRoomPrizes(
          roomId,
          paging,
          true
        );
        setRoomActivePrizes(activePrizesResponse.data.content);
      } catch (error) {
        console.error("Error fetching active prizes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomActivePrizes();
  }, [roomId, paging.page]);

  return { roomActivePrizes, loading, setPaging };
};
