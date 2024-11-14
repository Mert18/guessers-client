"use client";
import React from "react";
import RoomName from "./RoomName";
import ComponentWithHeader from "../common/ComponentWithHeader";
import { useTranslation } from "react-i18next";
import PrimaryButton from "../common/button/PrimaryButton";

const RoomHeader = ({ roomUser }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center">
      {roomUser.owner && (
        <div className="text-xs flex justify-center items-center">
          <PrimaryButton
            href={`/home/room/${roomUser?.room?.id}/event/create`}
            text={t("eventCreate")}
            mr={true}
          />
          <PrimaryButton
            href={`/home/room/${roomUser?.room?.id}/create-prize`}
            text={t("createPrize")}
            mr={true}
          />
          <PrimaryButton
            href={`/home/room/${roomUser?.room?.id}/invite`}
            text={t("invite")}
            mr={true}
          />
          <PrimaryButton
            href={`/home/room/${roomUser?.room?.id}/lendtoken`}
            text={t("lendToken")}
          />
        </div>
      )}
      <div className="w-full">
        <ComponentWithHeader name={t("room")}>
          <RoomName roomName={roomUser?.room?.name} />
        </ComponentWithHeader>
      </div>
    </div>
  );
};

export default RoomHeader;
