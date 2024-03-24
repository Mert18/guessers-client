"use client";
import React, { useState } from "react";

const IncreaseBid = ({ handleIncreaseBid, handleSetBid }) => {
  const [bidInput, setBidInput] = useState(0);
  return (
    <div>
      <div className="flex justify-center p-4">
        <button
          className="m-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleIncreaseBid(100)}
        >
          $100
        </button>
        <button
          className="m-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleIncreaseBid(250)}
        >
          $250
        </button>
        <button
          className="m-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleIncreaseBid(500)}
        >
          $500
        </button>
      </div>
      <div className="flex flex-col justify-center items-center">
        <input
          type="number"
          value={bidInput}
          onChange={(e) => setBidInput(e.target.value)}
          className="h-8 focus:outline-none focus:shadow-outline border border-red-500 rounded-md py-2 px-4 block w-full appearance-none leading-normal"
        />
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-sm m-1"
          onClick={() => handleSetBid(Number.parseInt(bidInput))}
        >
          Place Custom Bid
        </button>
      </div>
    </div>
  );
};

export default IncreaseBid;
