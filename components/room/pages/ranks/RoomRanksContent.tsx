"use client";
import ComponentTitle from "@/components/common/ComponentTitle";
import Loader from "@/components/common/Loader";
import { useRoomRanks } from "@/hooks/useRoomRanks";
import React from "react";
import RoomTopPredictors from "./RoomTopPredictors";

interface IRoomRanksContentProps {
  params: {
    roomId: string;
  };
}

const RoomRanksContent = ({ params }: IRoomRanksContentProps) => {
  const { rankedPredictions, loading } = useRoomRanks(
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
    </div>
  );
};

export default RoomRanksContent;
