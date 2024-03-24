import React from "react";

const CurrentBid = ({ currentBid }) => {
  return (
    <div>
      <div className="flex flex-col">
        <p>Current Bid</p>
        <h2>{currentBid.bid}</h2>
      </div>
      <div className="flex flex-col">
        <p>Current Bidder</p>
        <h3>{currentBid.bidder}</h3>
      </div>
    </div>
  );
};

export default CurrentBid;
