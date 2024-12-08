import { useState, useEffect } from "react";
import { getRanks } from "@/api/room";


export const useRoomRanks = (roomId: string) => {
  const [rankedRiches, setRankedRiches] = useState([]);
  const [rankedPredictions, setRankedPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoomRanks = async () => {
      if (!roomId) return;

      setLoading(true);
      try {
        const response = await getRanks(roomId);
        setRankedPredictions(response.data.rankedByCorrectPredictions);
        setRankedRiches(response.data.rankedByBalance);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomRanks();
  }, [roomId]);

  return { rankedRiches, rankedPredictions, loading };
};
