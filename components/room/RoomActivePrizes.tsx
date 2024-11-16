"use client";
import { useState } from "react";
import ComponentTitle from "../common/ComponentTitle";
import Loader from "../common/Loader";
import PrizeCard from "../prize/PrizeCard";
import { IPrize } from "@/types/IPrize.model";

interface IRoomActivePrizesProps {
  prizes: IPrize[];
  roomId: string;
}

const RoomActivePrizes = ({ prizes, roomId }: IRoomActivePrizesProps) => {
  const [loading, setLoading] = useState(false);

  const prizesRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (prizes.length === 0) {
      return <p className="text-primary">No prizes available.</p>;
    } else {
      return <div className="w-full">
        <div className="bg-background flex justify-start items-center text-primary border-b border-primary text-xs">
          <h2 className="flex-1">{"name"}</h2>
          <h2 className="flex-1">{"description"}</h2>
          <h2 className="flex-1">{"cost"}</h2>
          <h2 className="flex-1">{"buy"}</h2>
        </div>
        {prizes.map((prize) => (
          <PrizeCard key={prize.id} prize={prize} />
        ))}
      </div>;
    }
  };

  return (
    <div className="my-8 text-xs">
      <ComponentTitle text={"prizes"} icon="/price-tag.svg" />
      {prizesRenderer()}
    </div>
  );
};

export default RoomActivePrizes;
