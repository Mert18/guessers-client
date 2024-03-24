"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CurrentBid from "./CurrentBid";

const CurrentAuction = () => {
  const [auction, setAuction] = useState({});
  const [socket, setSocket] = useState(null);
  const [currentBid, setCurrentBid] = useState({bid: 0, bidder: ""});

  const getCurrentAuction = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URI + `/api/auction/active`,
        { method: "GET" }
      );
      const data = await res.json();
      setAuction(data);
      setCurrentBid({bid: data.currentBid, bidder: data.currentBidder});
      console.log("data:", data);
    } catch (err) {
      console.error("ERror revc:", err);
    }
  };

  useEffect(() => {
    getCurrentAuction();
  }, []);

  useEffect(() => {
    // Create a WebSocket connection
    const newSocket = new WebSocket("ws://localhost:8080/auction");
    // WebSocket event handlers
    newSocket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened", event);
      setSocket(newSocket);
    });

    newSocket.addEventListener("message", (event) => {
      setCurrentBid(JSON.parse(event.data));
    });

    newSocket.addEventListener("close", (event) => {
      console.log("WebSocket connection closed", event);
    });

    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message);
      socket.send(jsonMessage);
    } else {
      console.error("WebSocket connection not open");
    }
  };

  const handleIncreaseBid = () => {
    console.log("Increase bid clicked");
    const message = {
      auctionId: auction.auctionId,
      itemId: auction.itemId,
      bidder: "test",
      bid: currentBid.bid + 100,
    };
    sendMessage(message);
  };

  return (
    <div>
      <div>
        <h1>{auction.itemName}</h1>
        <Image
          src={auction.itemPhotoUrl}
          alt={auction.itemName}
          width={150}
          height={150}
        />

        <CurrentBid
          currentBid={currentBid}
        />
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleIncreaseBid}
          >
            Increase Bid
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentAuction;
