"use client";
import React, { useEffect, useRef, useState } from "react";
import { listSelfRooms } from "@/api/room";
import { useParams } from "next/navigation";
import RoomsSelector from "../navbar/RoomsSelector";
import Logo from "./Logo";
import HamburgerMenu from "../navbar/HamburgerMenu";
import { getInvites } from "@/api/user";
import InvitesWrapper from "../navbar/InvitesWrapper";
import RoomBalance from "../navbar/RoomBalance";

const Navbar = () => {
  const [roomsMenuOpen, setRoomsMenuOpen] = useState(false);
  const [invitesMenuOpen, setInvitesMenuOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [roomUser, setRoomUser] = useState({
    balance: 0,
  });
  const params = useParams();

  const [roomUsers, setRoomUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const roomsMenuRef = useRef(null);
  const hamburgerMenuRef = useRef(null);
  const invitesMenuRef = useRef(null);

  useEffect(() => {
    listSelfRooms().then((response) => {
      setRoomUsers(response.data);
    });

    getInvites().then((response) => {
      setInvites(response.data);
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
    <div className="flex justify-between items-center text-text bg-background2 p-2">
      <Logo />

      <div className="flex justify-end items-center text-text text-xs w-full">
        <InvitesWrapper
          invitesMenuRef={invitesMenuRef}
          setInvitesMenuOpen={setInvitesMenuOpen}
          invitesMenuOpen={invitesMenuOpen}
          invites={invites}
        />

        <div className="mr-8 flex justify-center items-center h-full">
          <RoomsSelector
            roomsMenuRef={roomsMenuRef}
            setRoomsMenuOpen={setRoomsMenuOpen}
            roomsMenuOpen={roomsMenuOpen}
            roomUsers={roomUsers}
            setRoomUser={setRoomUser}
            roomId={params.roomId}
          />
          {roomUser && <RoomBalance roomUser={roomUser} />}
        </div>

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
