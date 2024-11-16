"use client"
import RoomGuessPapers from "@/components/room/RoomGuessPapers";
import { useRoomGuessPapers } from "@/hooks/useRoomGuessPapers";

interface IRoomPapersProps {
  params: {
    roomId: string;
  };
}

const RoomPapers = ({ params }: IRoomPapersProps) => {
  const initialPaging = { page: 0, size: 5 };
  const { roomGuessPapers, loading, setPaging } = useRoomGuessPapers(
    params.roomId,
    initialPaging
  );

  return (
    <div>
      <RoomGuessPapers
        guessPapers={roomGuessPapers}
        setPaging={setPaging}
        loading={loading}
      />
    </div>
  );
};

export default RoomPapers;
