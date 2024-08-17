"use client";
import { listSelfRooms } from "@/api/room";
import React, { useEffect, useState } from "react";
import ComponentTitle from "../common/ComponentTitle";
import SelfRoomCard from "./SelfRoomCard";
import { t } from "i18next";
import Pager from "../common/Pager";
import Loader from "../common/Loader";

const SelfRoomsList = () => {
  const [selfRooms, setSelfRooms] = useState([]);
  const [paging, setPaging] = useState({ page: 0, size: 5 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    listSelfRooms(paging)
      .then((response) => {
        setSelfRooms(response.data.content);
        setPaging((prevState) => ({
          ...prevState,
          totalPages: response.data.page.totalPages,
          totalElements: response.data.page.totalElements,
        }));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [paging.page]);

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
          <Pager
            paging={paging}
            setPaging={setPaging}
            totalPages={paging.totalPages}
            totalElements={paging.totalElements}
          />
        </div>
      );
    }
  };
  return (
    <div className="my-8">
      <ComponentTitle text="Your rooms" />
      {selfRoomsListRenderer()}
    </div>
  );
};

export default SelfRoomsList;
