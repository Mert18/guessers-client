"use client";
import ComponentTitle from "@/components/common/ComponentTitle";
import Loader from "@/components/common/Loader";
import RoomRichests from "@/components/room/RoomRichests";
import RoomTopPredictors from "@/components/room/RoomTopPredictors";
import { useRoomRanks } from "@/hooks/useRoomRanks";

interface IRoomRanksProps {
  params: {
    roomId: string;
  };
}

const RoomRanks = ({ params }: IRoomRanksProps) => {
  const { rankedRiches, rankedPredictions, loading } = useRoomRanks(
    params.roomId
  );

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col justify-center items-start w-full">
      {rankedPredictions && (
        <>
          <ComponentTitle text={"Top Predictors"} />
          <RoomTopPredictors rankedPredictions={rankedPredictions} />
        </>
      )}

      {rankedRiches && (
        <>
          <ComponentTitle text={"Richests"} />
          <RoomRichests rankedRiches={rankedRiches} />
        </>
      )}
    </div>
  );
};

export default RoomRanks;
