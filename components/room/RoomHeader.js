"use client";
import React, { useEffect, useState } from "react";
import RoomName from "./RoomName";
import ComponentWithHeader from "../common/ComponentWithHeader";
import RoomTopPredictors from "./RoomTopPredictors";
import RoomRichests from "./RoomRichests";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../common/button/PrimaryButton";
import { getRanks } from "@/api/room";
import Loader from "../common/Loader";

const RoomHeader = ({ roomId, roomUser }) => {
  const { t } = useTranslation();
  const [rankedRiches, setRankedRiches] = useState([]);
  const [rankedPredictions, setRankedPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRanks(roomId)
      .then((response) => {
        setRankedPredictions(response.data.rankedByCorrectPredictions);
        setRankedRiches(response.data.rankedByBalance);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [roomId]);

  return (
    <div className="flex flex-col items-center justify-center">
      <ComponentWithHeader name={t("room")}>
        <RoomName roomName={roomUser?.room?.name} />
      </ComponentWithHeader>

      {roomUser.owner && (
        <div className="text-xs flex justify-center items-center">
          <PrimaryButton
            href={`/home/room/${roomUser?.room?.id}/event/create`}
            text={t("eventCreate")}
            noBg={true}
          />
          <PrimaryButton
            href={`/home/room/${roomUser?.room?.id}/invite`}
            text={t("invite")}
            noBg={true}
          />
        </div>
      )}
      {loading ? (
        <Loader />
      ) : (
        <div className="flex md:flex-row flex-col justify-center items-start">
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
      )}
    </div>
  );
};

export default RoomHeader;
