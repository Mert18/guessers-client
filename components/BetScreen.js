"use client";
import React, { useEffect, useState } from "react";
import CurrentBetSlip from "./betslip/CurrentBetSlip";
import ActiveEvents from "./events/ActiveEvents";

const BetScreen = ({ events, roomId, owner }) => {
  const [betAmount, setBetAmount] = useState(100);

  const [betSlip, setBetSlip] = useState({
    bets: [],
    stakes: 100,
    totalOdds: 1,
    wins: 100,
  });

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
      newBetSlip[index].option = option;
      setBetSlip((prevState) => ({
        ...prevState,
        bets: newBetSlip,
      }));
    }
  };
  return (
    <div>
      {betSlip?.bets.length > 0 && (
        <CurrentBetSlip
          betSlip={betSlip}
          setBetAmount={setBetAmount}
          roomId={roomId}
        />
      )}
      <ActiveEvents
        events={events}
        handleOptionSelected={handleOptionSelected}
        owner={owner}
        roomId={roomId}
      />
    </div>
  );
};

export default BetScreen;
