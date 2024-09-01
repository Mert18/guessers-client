import React from "react";
import PublicRoomCard from "./PublicRoomCard";
import ComponentTitle from "../common/ComponentTitle";
import Loader from "../common/Loader";
import { t } from "i18next";

const PublicRoomsList = ({ publicRooms, paging, setPaging, loading }) => {
  const publicRoomsListRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (publicRooms.length === 0) {
      return <p className="text-primary">No public rooms available.</p>;
    } else {
      return (
        <div className="w-full">
          <div className="bg-background flex justify-start items-center text-primary border-b border-primary">
            <h2 className="flex-1">{t("roomName")}</h2>
            <h2 className="flex-1">{t("owner")}</h2>
            <h2 className="flex-1">{t("memberCount")}</h2>
            <h2 className="flex-1">{t("join")}</h2>
          </div>

          {publicRooms?.map((room) => (
            <PublicRoomCard key={room.id} room={room} />
          ))}
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text="Public rooms" icon="door-open.svg" />
      {publicRoomsListRenderer()}
    </div>
  );
};

export default PublicRoomsList;
