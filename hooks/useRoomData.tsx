import { useState, useEffect } from "react";
import { listRoomGuessPapersByStatus } from "@/api/guesspaper";
import { getRoomPrizes } from "@/api/prize";
import { getRoomUser } from "@/api/room";
import { IPaging } from "@/types/IRequest.model";

interface IUseRoomDataProps {
  roomId: string;
  roomGuessPapersPaging: IPaging;
  roomPrizesPaging: IPaging;
}

export const useRoomData = ({
  roomId,
  roomGuessPapersPaging,
  roomPrizesPaging,
}: IUseRoomDataProps) => {
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
      } finally {
        setLoading((prev) => ({ ...prev, user: false }));
      }

      // Fetch Guess Papers
      setLoading((prev) => ({ ...prev, guessPapers: true }));
      try {
        const guessPapersResponse = await listRoomGuessPapersByStatus(
          {roomId: roomId,
          paging: roomGuessPapersPaging}
        );
        setRoomGuessPapers(guessPapersResponse.data.content);
      } finally {
        setLoading((prev) => ({ ...prev, guessPapers: false }));
      }

      // Fetch Prizes
      setLoading((prev) => ({ ...prev, prizes: true }));
      try {
        const prizesResponse = await getRoomPrizes({
          roomId: roomId,
          paging: roomPrizesPaging,
          active: true,
        });
        setRoomPrizes(prizesResponse.data.content);
      } finally {
        setLoading((prev) => ({ ...prev, prizes: false }));
      }
    };

    fetchRoomData();
  }, [roomId, roomGuessPapersPaging, roomPrizesPaging]);

  return { roomUser, roomGuessPapers, roomPrizes, loading };
};
