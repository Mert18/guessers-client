"use client";
import { readyEventLeagues, readyEvents } from "@/api/admin";
import React, { useEffect, useState } from "react";

const ReadyEventsManagement = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    readyEventLeagues().then((response) => {
      setLeagues(response?.data?.data);
    });
  }, []);

  return (
    <div className="flex flex-col h-[50vh] justify-center items-center">
      {leagues.map((league) => (
        <button onClick={() => {
          readyEvents(league.code);
        }} className="hover:text-primary-default" key={league.code}>
          <p>{league.name}</p>
        </button>
      ))}
    </div>
  );
};

export default ReadyEventsManagement;
