"use client";
import React from "react";
import RoomName from "./RoomName";
import ComponentWithHeader from "../common/ComponentWithHeader";
import RoomTopPredictors from "./RoomTopPredictors";
import RoomRichests from "./RoomRichests";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../common/button/PrimaryButton";

const RoomHeader = ({ roomUser, rankedRiches, rankedPredictions }) => {
  const { t } = useTranslation();

  return (
    <div className="my-10 flex flex-col items-center w-full">
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
      <div className="flex justify-center items-center">
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
    </div>
  );
};

export default RoomHeader;
