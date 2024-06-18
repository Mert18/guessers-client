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
                ? { backgroundColor: "#B02B2B" }
                : betSlip.status === "WON"
                ? { backgroundColor: "#A1C398" }
                : { backgroundColor: "#D5DCDE", color: "#333333" }
            }
          >
            <div className="p-2 m-2">
              <b>{betSlip.username}</b> placed <b>{betSlip.stakes}₺</b>
              {betSlip.bets.map((bet) => {
                return (
                  <div key={bet.id} className="w-64 flex justify-between">
                    <p>
                      <b>{bet.event.name}</b>
                    </p>{" "}
                    <p>
                      <b>{bet.option.name}</b>
                    </p>
                  </div>
                );
              })}
              <span>
                {new Date(betSlip.date).toLocaleDateString()}{" "}
                {new Date(betSlip.date).toLocaleTimeString()}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlacedBets;
