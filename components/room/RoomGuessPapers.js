"use client";
import { listRoomGuessPapersByStatus } from "@/api/guesspaper";
import React, { useEffect, useState } from "react";
import ComponentTitle from "../common/ComponentTitle";
import { t } from "i18next";
import GuessPaperCard from "../guesspaper/GuessPaperCard";
import Loader from "../common/Loader";

const RoomGuessPapers = ({ roomId }) => {
  const [guessPapers, setGuessPapers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRoomGuessPapers = async (roomId) => {
    try {
      setLoading(true);
      const response = await listRoomGuessPapersByStatus(roomId);
      setGuessPapers(response.data.content);
    } catch (error) {
      console.error("Error fetching room guess papers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!roomId) return;
    fetchRoomGuessPapers(roomId);
  }, [roomId]);

  const roomGuessPapersRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (guessPapers.length === 0) {
      return <p className="text-primary">No Room guess papers available.</p>;
    } else {
      return (
        <div className="w-full">
          <div className="bg-background flex justify-start items-center text-primary border-b border-primary text-xs">
            <h2 className="flex-1">{t("username")}</h2>
            <h2 className="flex-1">{t("status")}</h2>
            <h2 className="flex-1">{t("stakes")}</h2>
            <h2 className="flex-1">{t("odds")}</h2>
            <h2 className="flex-1">{t("wins")}</h2>
            <h2 className="flex-1">{t("details")}</h2>
          </div>
          {guessPapers.map((guessPaper) => (
            <GuessPaperCard key={guessPaper.id} guessPaper={guessPaper} />
          ))}
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text={t("guessPapers")} />
      {roomGuessPapersRenderer()}
    </div>
  );
};

export default RoomGuessPapers;
