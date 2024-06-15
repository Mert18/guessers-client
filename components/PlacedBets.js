"use client";
import { getRoomBetSlips } from "@/api/bet";
import React, { useEffect, useState } from "react";

const PlacedBets = ({ roomId }) => {
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [betSlips, setBetSlips] = useState([]);

  useEffect(() => {
    getRoomBetSlips(roomId, paging).then((response) => {
      setBetSlips(response.data.content);
    });
  }, []);
  return (
    <div>
      {betSlips.map((betSlip) => {
        return (
          <div
            key={betSlip.id}
            className="text-white"
            style={
              betSlip.status === "LOST"
                ? { backgroundColor: "red" }
                : betSlip.status === "WON"
                ? { backgroundColor: "green" }
                : {}
            }
          >
            <p className="p-2 m-2">
              <b>{betSlip.username}</b> placed <b>{betSlip.stakes}</b> to {" "}
              {betSlip.bets.map((bet) => {
                return (
                  <span key={bet.id}>
                    <b>{bet.event.name}</b> for option <b>{bet.option.name}</b>
                  </span>
                );
              })}
              <span> at date {new Date(betSlip.date).toLocaleDateString()} {new Date(betSlip.date).toLocaleTimeString()}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PlacedBets;
