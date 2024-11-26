"use client";
import RoomActivePrizes from "@/components/room/RoomActivePrizes";
import { useRoomPrizes } from "@/hooks/useRoomPrizes";

interface IRoomPrizesProps {
  params: {
    roomId: string;
  };
}

const RoomPrizes = ({ params }: IRoomPrizesProps) => {
  const initialPaging = { page: 0, size: 5 };
  const { roomActivePrizes, loading, setPaging } = useRoomPrizes({
    roomId: params.roomId,
    initialPaging,
  });

  return <RoomActivePrizes prizes={roomActivePrizes} roomId={params.roomId} />;
};

export default RoomPrizes;
