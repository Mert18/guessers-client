import { useState, useEffect } from "react";
import { getRanks } from "@/api/room";

interface IUseRoomRanksProps {
  roomId: string;
}

export const useRoomRanks = (roomId: IUseRoomRanksProps) => {
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
      } catch (error) {
        console.error("Error fetching room ranks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomRanks();
  }, [roomId]);

  return { rankedRiches, rankedPredictions, loading };
};
