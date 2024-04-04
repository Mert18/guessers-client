"use client";
import React, { useState, useEffect } from "react";
import CurrentBid from "./CurrentBid";
import Countdown from "./Countdown";
import { useSession } from "next-auth/react";
import IncreaseBid from "./IncreaseBid";
import AuctionItemHeader from "./AuctionItemHeader";
import { getUserBalance } from "@/api/user";
import UserBalance from "./UserBalance";

const CurrentAuction = () => {
  const [auction, setAuction] = useState({});
  const [socket, setSocket] = useState(null);
  const [currentBid, setCurrentBid] = useState({ bid: 0, bidder: "" });
  const [userBalance, setUserBalance] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    console.log("User balance updated", userBalance);
  }, [userBalance]);

  useEffect(() => {
    // Create a WebSocket connection
    const newSocket = new WebSocket("ws://localhost:8080/auction");
    // WebSocket event handlers
    newSocket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened", event);
      getUserBalance(session?.user?.name).then((response) => {
        console.log("User balance", response.data);
      });
      setSocket(newSocket);
    });

    newSocket.addEventListener("message", (event) => {
      const incomingMessage = JSON.parse(event.data);

      if (incomingMessage.type === "auctionUpdate") {
        setAuction(incomingMessage.data);
        if (
          incomingMessage.data.currentBid ||
          incomingMessage.data.currentBidder
        ) {
          setCurrentBid({
            bid: incomingMessage.data.currentBid,
            bidder: incomingMessage.data.currentBidder,
          });
        } else {
          setCurrentBid({
            bid: 0,
            bidder: "",
          });
        }
        getUserBalance(session?.user?.name).then((response) => {
          setUserBalance(response.data);
        });
      } else if (incomingMessage.type === "bidUpdate") {
        setCurrentBid(incomingMessage.data);
      }
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
    if(amount > userBalance.balance) {
      console.error('Insufficient balance');
      return;
    }
    const message = {
      auctionId: auction.auctionId,
      itemId: auction.itemId,
      bidder: session.user.name,
      bid: currentBid.bid + amount,
    };
    sendMessage(message);
  };

  const handleSetBid = (amount) => {
    if(amount > userBalance.balance) {
      console.error('Insufficient balance');
      return;
    }
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
      <UserBalance userBalance={userBalance} />
      <CurrentBid currentBid={currentBid} />
      <IncreaseBid
        handleIncreaseBid={handleIncreaseBid}
        handleSetBid={handleSetBid}
      />
    </div>
  );
};

export default CurrentAuction;
