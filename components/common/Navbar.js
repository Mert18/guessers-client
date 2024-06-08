"use client";
import React, { useEffect, useState } from "react";
import AuthStatus from "../authStatus";
import Link from "next/link";
import { getUserBalance } from "@/api/user";

const Navbar = () => {
  const [balance, setBalance] = useState();

  useEffect(() => {
    getUserBalance().then((res) => {
      setBalance(res.data.balance);
    });
  }, []);

  return (
    <div className="flex justify-between p-2 items-center border border-b-red-400">
      <div>
        <Link className="mr-2" href="/main">
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
