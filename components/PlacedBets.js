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
  return <div>
    {betSlips.map((betSlip) => {
        return <div key={betSlip.id} style={betSlip.status === "LOST" ? {backgroundColor: "red"} : betSlip.status === "WON" ? {backgroundColor: "green"} : {} }>
            <p>User: {betSlip.username}</p>
            <p>Amount: {betSlip.stakes}</p>
            <div>
            {betSlip.bets.map((bet) => {
                return <div key={bet.id}>
                <p>Event: {bet.event.name}</p>
                <p>Option: {bet.option.name}</p>
                <p>Odds: {bet.option.odds}</p>
                </div>;
            })}
            </div>
        </div>;
    } )}
  </div>;
};

export default PlacedBets;
