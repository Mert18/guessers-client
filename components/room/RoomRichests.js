"use client";
import { rankRiches } from "@/api/room";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const RoomRichests = ({ roomId }) => {
  console.log("RoomId:", roomId);
  const [richests, setRichests] = useState([]);
  useEffect(() => {
    if(!roomId) return;
    rankRiches(roomId).then((response) => {
      console.log("Richest:", response);
      setRichests(response.data);
    });
  }, [roomId]);
  return (
    <ul className="max-w-48 w-48 text-xs">
      {richests?.map((user, index) => (
        <li
          key={index}
          className="flex justify-between items-center my-2 w-full"
        >
          <div className="flex justify-start items-center">
            {index == 0 ? (
              <Image src="/money_green.svg" width={20} height={20} />
            ) : index == 1 ? (
              <Image src="/money_red.svg" width={20} height={20} />
            ) : (
              <Image src="/money_black.svg" width={20} height={20} />
            )}
            <p className="font-bold ml-2">{user.username}</p>
          </div>
          <p className="font-bold text-tertiary-darker">{user.balance.toFixed(2)}₺</p>
        </li>
      ))}
    </ul>
  );
};

export default RoomRichests;
