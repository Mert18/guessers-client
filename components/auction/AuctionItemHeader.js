import React from "react";
import Image from "next/image";

const AuctionItemHeader = ({ auction }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="font-bold p-2">{auction.itemName}</h1>
      <Image
        src={auction.itemPhotoUrl}
        alt={auction.itemName}
        width={150}
        height={150}
        className="w-64 h-64"
      />
    </div>
  );
};

export default AuctionItemHeader;
