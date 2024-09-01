import React from "react";
import ComponentTitle from "../common/ComponentTitle";
import SelfRoomCard from "./SelfRoomCard";
import { t } from "i18next";
import Pager from "../common/Pager";
import Loader from "../common/Loader";

const SelfRoomsList = ({ selfRooms, paging, setPaging, loading }) => {
  const selfRoomsListRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (selfRooms.length === 0) {
      return <p className="text-primary">You have not attended any rooms.</p>;
    } else {
      return (
        <div className="w-full">
          <div className="bg-background flex justify-start items-center text-primary border-b border-primary">
            <h2 className="flex-1">{t("roomName")}</h2>
            <h2 className="flex-1">{t("owner")}</h2>
            <h2 className="flex-1">{t("memberCount")}</h2>
            <h2 className="flex-1">{t("public")}</h2>
            <h2 className="flex-1">{t("balance")}</h2>
          </div>
          {selfRooms.map((room) => (
            <SelfRoomCard key={room.id} roomUser={room} />
          ))}
          <Pager paging={paging} setPaging={setPaging} />
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text="Your rooms" icon="/door.svg" />
      {selfRoomsListRenderer()}
    </div>
  );
};

export default SelfRoomsList;
