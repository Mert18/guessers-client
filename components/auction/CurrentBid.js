import React from "react";

const CurrentBid = ({ currentBid }) => {
  return (
    <div className="p-2">
      <div className="flex flex-col justify-center items-center p-2">
        <p className="text-xs">Current Bid</p>
        <h2 className="text-2xl">${Math.round(currentBid.bid)}</h2>
      </div>
      <div className="flex flex-col justify-center items-center p-2">
        <p className="text-xs">Current Bidder</p>
        <h3 className="text-xl">{currentBid.bidder}</h3>
      </div>
    </div>
  );
};

export default CurrentBid;
