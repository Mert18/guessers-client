"use client";
import ComponentWithHeader from "@/components/common/ComponentWithHeader";
import Loader from "@/components/common/Loader";
import RoomRichests from "@/components/room/RoomRichests";
import RoomTopPredictors from "@/components/room/RoomTopPredictors";
import { useRoomRanks } from "@/hooks/useRoomRanks";
import { t } from "i18next";
import React from "react";

const RoomRanks = ({params}) => {
  const { rankedRiches, rankedPredictions, loading } = useRoomRanks(params.roomId);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col justify-center items-center w-full">
      {rankedPredictions && (
        <ComponentWithHeader name={t("roomTopPredictors")}>
          <RoomTopPredictors rankedPredictions={rankedPredictions} />
        </ComponentWithHeader>
      )}

      {rankedRiches && (
        <ComponentWithHeader name={t("roomRichests")}>
          <RoomRichests rankedRiches={rankedRiches} />
        </ComponentWithHeader>
      )}
    </div>
  );
};

export default RoomRanks;
