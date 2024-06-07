"use client";
import { getEvents } from "@/api/event";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Main = () => {
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [events, setEvents] = useState([]);
  const [betSlip, setBetSlip] = useState([]);
  const [betSlipWins, setBetSlipWins] = useState();
  const [betAmount, setBetAmount] = useState(100);
  const { data: session } = useSession();

  useEffect(() => {
    console.log("Sesssion: ", session?.user);
  }, [session]);

  useEffect(() => {
    getEvents(paging).then((res) => {
      setEvents(res.data.data.content);
    });
  }, [paging]);

  useEffect(() => {
    setBetSlipWins(
      betSlip.reduce((acc, bet) => acc * bet.option.odds, 1).toFixed(2) *
        betAmount
    );
  }, [betSlip]);

  useEffect(() => {
    setBetSlipWins(
      betSlip.reduce((acc, bet) => acc * bet.option.odds, 1).toFixed(2) *
        betAmount
    );
  }, [betAmount]);

  const handleOptionSelected = (event, option) => {
    const index = betSlip.findIndex((bet) => bet.event.id === event.id);
    if (index === -1) {
      setBetSlip([...betSlip, { event, option }]);
    } else {
      const newBetSlip = [...betSlip];
      newBetSlip[index].option = option;
      setBetSlip(newBetSlip);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full border-b border-b-black flex justify-center items-center">
        <div className="flex justify-center items-center flex-col w-96">
          <p>Kupon</p>
          {betSlip.length === 0 ? (
            <p>Kuponunuzda bahis yok</p>
          ) : (
            <div>
              <div className="flex flex-col justify-center items-start">
                {betSlip.map((bet) => {
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
                    {betSlip
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
                  <option>100</option>
                  <option>200</option>
                  <option>500</option>
                  <option>1000</option>
                </select>

                <button className="border border-black p-1">Oyna</button>
              </div>
              <div className="flex justify-center items-center">
                <p>
                  Kazanç: <span className="font-bold">{betSlipWins}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap justify-start items-center">
        {events.map((event) => {
          return (
            <div
              key={event.id}
              className="flex flex-col justify-center items-center w-96 h-48 m-4"
            >
              <p className="p-2">
                {new Date(event.date).toLocaleTimeString("tr-TR")}
              </p>
              <p className="p-2">{event.name}</p>
              <div className="flex w-full">
                {event.options.slice(0, 3).map((option) => {
                  return (
                    <button
                      onClick={() => handleOptionSelected(event, option)}
                      className="flex-1 flex-col justify-center items-center border border-black"
                    >
                      <p>{option.name}</p>
                      <p className="font-bold">{option.odds}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
