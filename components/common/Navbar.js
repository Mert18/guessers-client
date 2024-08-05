"use client";
import React, { useEffect, useRef, useState } from "react";
import { listSelfRooms } from "@/api/room";
import { useParams } from "next/navigation";
import RoomsSelector from "../navbar/RoomsSelector";
import AuthStatus from "../authStatus";
import Logo from "./Logo";
import HamburgerMenu from "../navbar/HamburgerMenu";

const Navbar = () => {
  const [roomsMenuOpen, setRoomsMenuOpen] = useState(false);
  const [invitesMenuOpen, setInvitesMenuOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const params = useParams();

  const [balance, setBalance] = useState();
  const [roomUsers, setRoomUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const roomsMenuRef = useRef(null);
  const hamburgerMenuRef = useRef(null);
  const invitesMenuRef = useRef(null);

  useEffect(() => {
    // getUserBalance().then((res) => {
    //   setBalance(res.data.balance);
    // });

    listSelfRooms().then((response) => {
      setRoomUsers(response.data);
    });

    // getInvites().then((res) => {
    //   setInvites(res.data.pendingInvites);
    // });
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
      if (
        hamburgerMenuRef.current &&
        !hamburgerMenuRef.current.contains(event.target)
      ) {
        setHamburgerMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center text-background p-2">
      <Logo />

      {/* Self rooms */}
      <div className="flex justify-end items-center text-text text-xs w-full">
        {/* <InvitesWrapper
          invitesMenuRef={invitesMenuRef}
          setInvitesMenuOpen={setInvitesMenuOpen}
          invitesMenuOpen={invitesMenuOpen}
          invites={invites}
        /> */}

        <RoomsSelector
          roomsMenuRef={roomsMenuRef}
          setRoomsMenuOpen={setRoomsMenuOpen}
          roomsMenuOpen={roomsMenuOpen}
          roomUsers={roomUsers}
          roomId={params.roomId}
        />

        {/* <BalanceWrapper balance={balance} /> */}

        <HamburgerMenu
          hamburgerMenuRef={hamburgerMenuRef}
          setHamburgerMenuOpen={setHamburgerMenuOpen}
          hamburgerMenuOpen={hamburgerMenuOpen}
        />
      </div>
    </div>
  );
};

export default Navbar;
