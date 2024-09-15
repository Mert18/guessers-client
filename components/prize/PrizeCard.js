import React from "react";
import PrimaryButton from "../common/button/PrimaryButton";
import { buyPrize } from "@/api/prize";

const PrizeCard = ({ prize }) => {
  const handleBuyPrize = (prizeId) => {
    buyPrize(prizeId);
  };
  return (
    <div className="w-full text-text">
      <div className="bg-background flex justify-start items-center text-text border-b border-primary">
        <p className="flex-1">{prize.name}</p>
        <p className="flex-1">{prize.description}</p>
        <p className="flex-1">{prize.value.toFixed(2)}</p>
        <div className="flex-1">
          <PrimaryButton
            text="Buy"
            noBg={true}
            onClick={() => handleBuyPrize(prize.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default PrizeCard;
