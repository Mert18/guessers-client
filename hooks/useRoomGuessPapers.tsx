import { useState, useEffect } from "react";
import { listRoomGuessPapersByStatus } from "@/api/guesspaper";
import { IPaging } from "@/types/IRequest.model";

interface IUseRoomGuessPapersProps {
  roomId: string;
  initialPaging: IPaging;
}

export const useRoomGuessPapers = ({
  roomId,
  initialPaging,
}: IUseRoomGuessPapersProps) => {
  const [roomGuessPapers, setRoomGuessPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState(initialPaging);

  useEffect(() => {
    const fetchRoomGuessPapers = async () => {
      if (!roomId) return; // Prevent calling if roomId is missing

      setLoading(true);
      try {
        const guessPapersResponse = await listRoomGuessPapersByStatus(
          roomId,
          paging
        );
        setRoomGuessPapers(guessPapersResponse.data.content);
      } catch (error) {
        console.error("Error fetching active events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomGuessPapers();
  }, [roomId, paging.page]);

  return { roomGuessPapers, loading, setPaging };
};
