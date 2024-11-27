"use client";
import { getRoomPrizes } from "@/api/prize";
import RoomActivePrizes from "@/components/room/RoomActivePrizes";
import { useEffect, useState } from "react";

interface IRoomPrizesProps {
  params: {
    roomId: string;
  };
}

const RoomPrizes = ({ params }: IRoomPrizesProps) => {
  const [roomActivePrizes, setRoomActivePrizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });

  const fetchRoomActivePrizes = async (roomId: string) => {
    if (!roomId) return;

    setLoading(true);
    await getRoomPrizes({
      roomId,
      paging,
      active: true,
    })
      .then((response) => {
        setRoomActivePrizes(response.data.content);
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
    fetchRoomActivePrizes(params.roomId);
  }, [params?.roomId, paging.page]);

  return <RoomActivePrizes prizes={roomActivePrizes} paging={paging} setPaging={setPaging} loading={loading} />;
};

export default RoomPrizes;
