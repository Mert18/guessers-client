"use client";
import { listRoomGuessPapersByStatus } from "@/api/guesspaper";
import { IPaging } from "@/types/IRequest.model";
import { useEffect, useState } from "react";
import RoomGuessPapers from "./RoomGuessPapers";

interface IRoomPapersContentProps {
  params: {
    roomId: string;
  };
}

const RoomPapersContent = ({ params }: IRoomPapersContentProps) => {
  const [roomGuessPapers, setRoomGuessPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState<IPaging>({
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });

  const fetchRoomGuessPapers = async (roomId: string) => {
    if (!roomId) return; // Prevent calling if roomId is missing

    setLoading(true);
    await listRoomGuessPapersByStatus({
      roomId,
      paging,
    })
      .then((response) => {
        setRoomGuessPapers(response.data.content);
        setPaging({
          page: response.data.page.number,
          size: response.data.page.size,
          totalPages: response.data.page.totalPages,
          totalElements: response.data.page.totalElements,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRoomGuessPapers(params?.roomId);
  }, [params?.roomId, paging?.page]);

  return (
    <RoomGuessPapers
      guessPapers={roomGuessPapers}
      paging={paging}
      setPaging={setPaging}
      loading={loading}
    />
  );
};

export default RoomPapersContent;
