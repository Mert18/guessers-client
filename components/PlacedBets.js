"use client";
import { getRoomBetSlips } from "@/api/bet";
import React, { useEffect, useState } from "react";
import PlacedBetSlip from "./betslip/PlacedBetSlip";

const PlacedBets = ({ roomId }) => {
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [betSlips, setBetSlips] = useState([]);

  useEffect(() => {
    getRoomBetSlips(roomId, paging).then((response) => {
      setBetSlips(response.data.content);
    });
  }, []);

  return (
    <ul>
      {betSlips.map((betSlip) => {
        return (
          <PlacedBetSlip betSlip={betSlip} key={betSlip.id} />
        );
      })}
    </ul>
  );
};

export default PlacedBets;
