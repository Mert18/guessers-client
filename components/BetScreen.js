"use client";
import React, { useEffect, useState } from "react";
import CurrentBetSlip from "./betslip/CurrentBetSlip";
import ActiveEvents from "./events/ActiveEvents";
import { getEvents } from "@/api/event";

const BetScreen = () => {
  const [events, setEvents] = useState([]);
  const [paging, setPaging] = useState({ page: 0, size: 10 });

  const [betAmount, setBetAmount] = useState(100);

  const [betSlip, setBetSlip] = useState({
    bets: [],
    stakes: 100,
    totalOdds: 1,
    wins: 100,
  });
    
  useEffect(() => {
    getEvents(paging).then((res) => {
      setEvents(res.data.content);
    });
  }, [paging]);

  useEffect(() => {
    setBetSlip((prevState) => ({
      ...prevState,
      stakes: betAmount,
      totalOdds: betSlip?.bets
        .reduce((acc, bet) => acc * bet.option.odds, 1)
        .toFixed(2),
      wins:
        betSlip?.bets
          .reduce((acc, bet) => acc * bet.option.odds, 1)
          .toFixed(2) * betAmount,
    }));
  }, [betAmount, betSlip?.bets]);

  const handleOptionSelected = (event, option) => {
    const index = betSlip?.bets.findIndex((bet) => bet.event.id === event.id);
    if (index === -1) {
      setBetSlip((prevState) => ({
        ...prevState,
        bets: [...betSlip.bets, { event, option }],
      }));
    } else {
      const newBetSlip = [...betSlip?.bets];
      console.log("New Bet Slip: ", newBetSlip);
      console.log("Index: ", index);
      newBetSlip[index].option = option;
      setBetSlip((prevState) => ({
        ...prevState,
        bets: newBetSlip,
      }));
    }
  };
  return (
    <div>
      <CurrentBetSlip betSlip={betSlip} setBetAmount={setBetAmount} />
      <ActiveEvents
        events={events}
        handleOptionSelected={handleOptionSelected}
      />
    </div>
  );
};

export default BetScreen;
