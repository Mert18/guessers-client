import { useState, useEffect } from "react";
import { listRoomGuessPapersByStatus } from "@/api/guesspaper";
import { getRoomPrizes } from "@/api/prize";
import { getRoomUser } from "@/api/room";

export const useRoomData = (
  roomId,
  roomGuessPapersPaging,
  roomPrizesPaging
) => {
  const [roomUser, setRoomUser] = useState(null);
  const [roomGuessPapers, setRoomGuessPapers] = useState([]);
  const [roomPrizes, setRoomPrizes] = useState([]);
  const [loading, setLoading] = useState({
    user: false,
    guessPapers: false,
    prizes: false,
  });

  useEffect(() => {
    const fetchRoomData = async () => {
      if (!roomId) return;

      // Fetch Room User
      setLoading((prev) => ({ ...prev, user: true }));
      try {
        const userResponse = await getRoomUser(roomId);
        setRoomUser(userResponse.data);
      } catch (error) {
        console.error("Failed to fetch room user", error);
      } finally {
        setLoading((prev) => ({ ...prev, user: false }));
      }

      // Fetch Guess Papers
      setLoading((prev) => ({ ...prev, guessPapers: true }));
      try {
        const guessPapersResponse = await listRoomGuessPapersByStatus(
          roomId,
          roomGuessPapersPaging
        );
        setRoomGuessPapers(guessPapersResponse.data.content);
      } catch (error) {
        console.error("Failed to fetch guess papers", error);
      } finally {
        setLoading((prev) => ({ ...prev, guessPapers: false }));
      }

      // Fetch Prizes
      setLoading((prev) => ({ ...prev, prizes: true }));
      try {
        const prizesResponse = await getRoomPrizes(
          roomId,
          roomPrizesPaging,
          true
        );
        setRoomPrizes(prizesResponse.data.content);
      } catch (error) {
        console.error("Failed to fetch room prizes", error);
      } finally {
        setLoading((prev) => ({ ...prev, prizes: false }));
      }
    };

    fetchRoomData();
  }, [roomId, roomGuessPapersPaging, roomPrizesPaging]);

  return { roomUser, roomGuessPapers, roomPrizes, loading };
};
