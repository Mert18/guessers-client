"use client";
import React, { useState, useEffect } from "react";
import ComponentTitle from "../common/ComponentTitle";
import Loader from "../common/Loader";
import { t } from "i18next";
import PrizeCard from "../prize/PrizeCard";

const RoomPrizes = ({ prizes, roomId }) => {
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({
    page: 0,
    size: 5,
  });

  const prizesRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (prizes.length === 0) {
      return <p className="text-primary">No prizes available.</p>;
    } else {
      return <div className="w-full">
        <div className="bg-background flex justify-start items-center text-primary border-b border-primary text-xs">
          <h2 className="flex-1">{t("name")}</h2>
          <h2 className="flex-1">{t("description")}</h2>
          <h2 className="flex-1">{t("cost")}</h2>
          <h2 className="flex-1">{t("buy")}</h2>
        </div>
        {prizes.map((prize) => (
          <PrizeCard key={prize.id} prize={prize} />
        ))}
      </div>;
    }
  };

  return (
    <div className="my-8 text-xs">
      <ComponentTitle text={t("prizes")} icon="/price-tag.svg" />
      {prizesRenderer()}
    </div>
  );
};

export default RoomPrizes;
