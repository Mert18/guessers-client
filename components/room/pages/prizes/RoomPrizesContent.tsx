"use client";
import { getRoomPrizes } from "@/api/prize";
import { IPaging } from "@/types/IRequest.model";
import React, { useEffect, useState } from "react";
import RoomActivePrizes from "./RoomActivePrizes";

interface IRoomPrizesContentProps {
  params: {
    roomId: string;
  };
}

const RoomPrizesContent = ({ params }: IRoomPrizesContentProps) => {
  const [roomActivePrizes, setRoomActivePrizes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState<IPaging>({
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

  return (
    <RoomActivePrizes
      prizes={roomActivePrizes}
      paging={paging}
      setPaging={setPaging}
      loading={loading}
    />
  );
};

export default RoomPrizesContent;
