import { placeBet } from "@/api/bet";
import React from "react";

const CurrentBetSlip = ({ betSlip, setBetAmount, roomId, setBetSlip }) => {
  const handlePlaceBet = () => {
    placeBet({
      bets: betSlip.bets,
      stakes: betSlip.stakes,
      roomId: roomId,
      totalOdds: betSlip.bets.reduce((acc, bet) => acc * bet.option.odds, 1),
    }).then((res) => {
      if (res.success === true) {
        setBetSlip({
          bets: [],
          stakes: 100,
          totalOdds: 1,
          wins: 100,
        });
      }
    });
  };

  return (
    <div className="w-96 p-2 border border-black flex justify-center items-center fixed right-10 bottom-10 bg-background-darker">
      <div className="flex justify-start items-start flex-col w-96">
        <p className="font-bold text-xs mb-5">CURRENT BETSLIP</p>

        <div className="flex justify-between items-center w-full">
          <p className="font-bold text-xs">TOTAL ODDS</p>
          <p className="font-bold text-sm text-secondary">
            {betSlip?.bets
              .reduce((acc, bet) => acc * bet.option.odds, 1)
              .toFixed(2)}
          </p>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="font-bold text-xs">STAKES</p>
          <select
            className="p-2"
            onChange={(e) => {
              setBetAmount(e.target.value);
            }}
          >
            <option key="100" value={100}>
              100₺
            </option>
            <option key="200" value={200}>
              200₺
            </option>
            <option key="500" value={500}>
              500₺
            </option>
            <option key="1000" value={1000}>
              1000₺
            </option>
            <option key="5000" value={5000}>
              5000₺
            </option>
            <option key="10000" value={10000}>
              10000₺
            </option>
          </select>
        </div>

        <div className="flex justify-between items-center w-full">
          <p className="font-bold text-xs">WINS</p>
          <p className="font-bold text-sm text-secondary">
            {betSlip?.wins.toFixed(2)}₺
          </p>
        </div>

        <div className="flex justify-between items-center w-full flex-row-reverse mt-4">
          <button
            className="bg-primary text-background font-bold rounded-md p-2"
            onClick={() => handlePlaceBet()}
          >
            Place Bet
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrentBetSlip;
