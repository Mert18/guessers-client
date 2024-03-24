"use client"
import { useCountdown } from "@/hooks/useCountdown";
import React from "react";

const Countdown = ({ date }) => {
  const [days, hours, minutes, seconds] = useCountdown(date);

  return <div className="font-bold text-xl">
    {hours} : {minutes} : {seconds}
  </div>;
};

export default Countdown;
