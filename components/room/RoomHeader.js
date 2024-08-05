"use client";
import React from "react";
import RoomName from "./RoomName";
import ComponentWithHeader from "../common/ComponentWithHeader";
import RoomTopPredictors from "./RoomTopPredictors";
import RoomRichests from "./RoomRichests";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const RoomHeader = ({ room, roomUser, rankedRiches, rankedPredictions }) => {
  const { t } = useTranslation();

  return (
    <div className="my-10 flex justify-evenly w-full">
      <ComponentWithHeader name={t("room")}>
        <RoomName roomName={room.name} />
      </ComponentWithHeader>

      {roomUser.owner && (
        <div className="text-xs flex flex-col">
          <Link
            href={`/home/room/${room.id}/event/create`}
            className="p-2 m-2 bg-primary text-background font-bold hover:bg-primary-brighter"
          >
            {t("eventCreate")}
          </Link>
          <Link
            href={`/home/room/${room.id}/invite`}
            className="p-2 m-2 bg-primary text-background font-bold hover:bg-primary-brighter"
          >
            {t("invite")}
          </Link>
        </div>
      )}

      <div>
        {rankedPredictions && (
          <ComponentWithHeader name={t("roomTopPredictors")}>
            <RoomTopPredictors rankedPredictions={rankedPredictions} />
          </ComponentWithHeader>
        )}
      </div>

      <div>
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
