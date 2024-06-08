import { placeBet } from "@/api/betslip";
import React from "react";

const CurrentBetSlip = ({ betSlip, setBetAmount }) => {
    
  const handlePlaceBet = () => {
    placeBet({
      bets: betSlip.bets,
      stakes: betSlip.stakes,
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
        <p>Kupon</p>
        {betSlip.length === 0 ? (
          <p>Kuponunuzda bahis yok</p>
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
                Toplam Oran:{" "}
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
                <option key="100">100</option>
                <option key="200">200</option>
                <option key="500">500</option>
                <option key="1000">1000</option>
              </select>

              <button
                className="border border-black p-1"
                onClick={() => handlePlaceBet()}
              >
                Oyna
              </button>
            </div>
            <div className="flex justify-center items-center">
              <p>
                Kazanç: <span className="font-bold">{betSlip?.wins}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentBetSlip;
