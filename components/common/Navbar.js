"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getInvites, getUserBalance } from "@/api/user";
import Image from "next/image";
import { getUserRooms } from "@/api/room";
import { useParams } from "next/navigation";
import RoomsSelector from "../navbar/RoomsSelector";
import InvitesWrapper from "../navbar/InvitesWrapper";
import AuthStatus from "../authStatus";
import BalanceWrapper from "../navbar/BalanceWrapper";

const Navbar = () => {
  const [roomsMenuOpen, setRoomsMenuOpen] = useState(false);
  const [invitesMenuOpen, setInvitesMenuOpen] = useState(false);
  const params = useParams();

  const [balance, setBalance] = useState();
  const [rooms, setRooms] = useState([]);
  const [invites, setInvites] = useState([]);
  const roomsMenuRef = useRef(null);
  const invitesMenuRef = useRef(null);

  useEffect(() => {
    getUserBalance().then((res) => {
      setBalance(res.data.balance);
    });

    getUserRooms().then((res) => {
      setRooms(res.data.rooms);
    });

    getInvites().then((res) => {
      setInvites(res.data.pendingInvites);
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        roomsMenuRef.current &&
        !roomsMenuRef.current.contains(event.target)
      ) {
        setRoomsMenuOpen(false);
      }
      if (
        invitesMenuRef.current &&
        !invitesMenuRef.current.contains(event.target)
      ) {
        setInvitesMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col justify-between p-2 items-center text-background">
      <Link href="/" className="bg-primary p-2 rounded-md">
        <Image
          src="/logo/logo.svg"
          alt="logo"
          width={60}
          height={60}
          className="w-auto h-auto"
          priority={false}
        />
      </Link>

      {/* Self rooms */}
      <div className="flex justify-between items-center text-primary text-xs w-full">
      <InvitesWrapper
          invitesMenuRef={invitesMenuRef}
          setInvitesMenuOpen={setInvitesMenuOpen}
          invitesMenuOpen={invitesMenuOpen}
          invites={invites}
        />

        <RoomsSelector
          roomsMenuRef={roomsMenuRef}
          setRoomsMenuOpen={setRoomsMenuOpen}
          roomsMenuOpen={roomsMenuOpen}
          rooms={rooms}
          roomId={params.roomId}
        />
        
        <BalanceWrapper balance={balance} />

        <AuthStatus />
      </div>
    </div>
  );
};

export default Navbar;
