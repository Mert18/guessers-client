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
    <div className="my-10 flex justify-evenly w-full">
      <ComponentWithHeader name={t("room")}>
        <RoomName roomName={roomUser?.room?.name} />
      </ComponentWithHeader>

      {roomUser.owner && (
        <div className="text-xs flex flex-col">
          <PrimaryButton
            href={`/home/room/${roomUser?.room?.id}/event/create`}
            text={t("eventCreate")}
          />
          <PrimaryButton
            href={`/home/room/${roomUser?.room?.id}/invite`}
            className="p-2 m-2 bg-primary text-background font-bold hover:bg-primary-brighter"
            text={t("invite")}
          />
        </div>
      )}

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

export default RoomHeader;
