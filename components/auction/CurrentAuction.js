"use client";
import React, { useState, useEffect } from "react";
import CurrentBid from "./CurrentBid";
import Countdown from "./Countdown";
import { useSession } from "next-auth/react";
import IncreaseBid from "./IncreaseBid";
import AuctionItemHeader from "./AuctionItemHeader";

const CurrentAuction = () => {
  const [auction, setAuction] = useState({});
  const [socket, setSocket] = useState(null);
  const [currentBid, setCurrentBid] = useState({ bid: 0, bidder: "" });
  const { data: session } = useSession();

  const getCurrentAuction = async () => {
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_BACKEND_URI + `/api/auction/active`,
        { method: "GET" }
      );
      const data = await res.json();
      setAuction(data);
      setCurrentBid({ bid: data.currentBid, bidder: data.currentBidder });
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

  const handleIncreaseBid = (amount) => {
    console.log("amount:", amount);
    const message = {
      auctionId: auction.auctionId,
      itemId: auction.itemId,
      bidder: session.user.name,
      bid: currentBid.bid + amount,
    };
    sendMessage(message);
  };

  const handleSetBid = (amount) => {
    const message = {
      auctionId: auction.auctionId,
      itemId: auction.itemId,
      bidder: session.user.name,
      bid: amount,
    };
    sendMessage(message);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full sm:w-2/3 md:w-1/3 border border-red-400 p-4">
      <AuctionItemHeader auction={auction} />
      <Countdown date={new Date(auction.auctionEnd)} />
      <CurrentBid currentBid={currentBid} />
      <IncreaseBid
        handleIncreaseBid={handleIncreaseBid}
        handleSetBid={handleSetBid}
      />
    </div>
  );
};

export default CurrentAuction;
