import { placeBet } from "@/api/bet";
import React from "react";

const CurrentBetSlip = ({ betSlip, setBetAmount, roomId }) => {
  const handlePlaceBet = () => {
    placeBet({
      bets: betSlip.bets,
      stakes: betSlip.stakes,
      roomId: roomId,
      totalOdds: betSlip.bets.reduce((acc, bet) => acc * bet.option.odds, 1),
    })
      .then((res) => {
        console.log("Bet Placed: ", res);
        
      })
      .catch((error) => {
        console.error("Error placing bet: ", error);
      });
  };

  return (
    <div className="w-full border-b border-b-black flex justify-center items-center">
      <div className="flex justify-center items-center flex-col w-96">
        <p>Predictions</p>
        {betSlip.length === 0 ? (
          <p>No predictions</p>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-start">
              {betSlip?.bets.map((bet) => {
                return (
                  <div
                    key={bet.event.id}
                    className="flex justify-between items-center w-96 h-12 border border-black p-2 my-0.5"
                  >
                    <p>{bet.event.name}</p>
                    <p>{bet.option.name}</p>
                    <p>{bet.option.odds}</p>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center my-2 w-full">
              <p>
                Total odds:{" "}
                <span className="font-bold">
                  {betSlip?.bets
                    .reduce((acc, bet) => acc * bet.option.odds, 1)
                    .toFixed(2)}
                </span>
              </p>
            </div>
            <div className="flex justify-between items-center w-full">
              <select
                className="p-2"
                onChange={(e) => {
                  setBetAmount(e.target.value);
                }}
              >
                <option key="100" value={100}>100₺</option>
                <option key="200" value={200}>200₺</option>
                <option key="500" value={500}>500₺</option>
                <option key="1000" value={1000}>1000₺</option>
                <option key="5000" value={5000}>5000₺</option>
                <option key="10000" value={10000}>10000₺</option>
              </select>

              <button
                className="border border-black p-1"
                onClick={() => handlePlaceBet()}
              >
                Place Bet
              </button>
            </div>
            <div className="flex justify-center items-center">
              <p>
                Wins: <span className="font-bold">{betSlip?.wins.toFixed(2)}₺</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentBetSlip;
