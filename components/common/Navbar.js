"use client";
import React, { useEffect, useState } from "react";
import AuthStatus from "../authStatus";
import Link from "next/link";
import { getUserBalance } from "@/api/user";
import Image from "next/image";
import { getUserRooms } from "@/api/room";

const Navbar = () => {
  const [roomsMenuOpen, setRoomsMenuOpen] = useState(false);
  const [balance, setBalance] = useState();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getUserBalance().then((res) => {
      setBalance(res.data.balance);
    });

    getUserRooms().then((res) => {
      setRooms(res.data.rooms);
    });
  }, []);

  return (
    <div className="flex justify-between p-2 items-center bg-black text-white">
      <div>
        <Link href="/">
          <Image src="/logo/logo.svg" alt="logo" width={100} height={100} />
        </Link>
      </div>

      {/* Self rooms */}
      <div className="relative w-64">
        <button onClick={() => setRoomsMenuOpen(!roomsMenuOpen)}>Rooms</button>
        {roomsMenuOpen && (
          <div className="absolute top-full left-0 bg-black w-64 p-2">
            {rooms.map((room) => (
              <Link key={room.id} href={`/room/${room.id}`} className="p-2" onClick={() => setRoomsMenuOpen(false)}>
                <p>{room.name}</p>
              </Link>
            ))}
            <Link className="p-2 w-full" href="/room/create" onClick={() => setRoomsMenuOpen(false)}>Create Room</Link>
          </div>
        )}
      </div>

      <div>
        <Link className="mr-2" href="/room">
          Home
        </Link>
        <Link href="/profile">Profile</Link>
        <Link href="/betslips">My Bet Slips</Link>
      </div>

      <div>
        <p>
          Balance: <span className="font-bold">{balance?.toFixed(2)}</span>
        </p>
        <AuthStatus />
      </div>
    </div>
  );
};

export default Navbar;
