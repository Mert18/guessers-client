"use client";
import React, { useEffect, useRef, useState } from "react";
import AuthStatus from "../authStatus";
import Link from "next/link";
import { getInvites, getUserBalance } from "@/api/user";
import Image from "next/image";
import { acceptRoomInvite, getUserRooms, rejectRoomInvite } from "@/api/room";
import RoomsMenu from "../navbar/RoomsMenu";
import { useParams } from "next/navigation";

const Navbar = () => {
  const [roomsMenuOpen, setRoomsMenuOpen] = useState(false);
  const [invitesMenuOpen, setInvitesMenuOpen] = useState(false);
  const params = useParams()

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
    <div className="flex justify-between p-2 items-center bg-black text-white">
      <div>
        <Link href="/">
          <Image
            src="/logo/logo.svg"
            alt="logo"
            width={60}
            height={60}
            className="w-auto h-auto"
            priority={false}
          />
        </Link>
      </div>

      {/* Self rooms */}
      <div className="flex">
        <div className="relative w-64" ref={roomsMenuRef}>
          <button onClick={() => setRoomsMenuOpen(!roomsMenuOpen)}>
            Rooms
          </button>
          {roomsMenuOpen && (
            <RoomsMenu rooms={rooms} setRoomsMenuOpen={setRoomsMenuOpen} roomId={params.roomId} />
          )}
        </div>
        <div className="relative w-64" ref={invitesMenuRef}>
          <button onClick={() => setInvitesMenuOpen(!invitesMenuOpen)}>
            Invites
            {invites.length > 0 && (
              <span className="w-2 h-2 bg-red-600 rounded-full absolute top-0 -left-3"></span>
            )}
          </button>
          {invitesMenuOpen && (
            <div className="absolute top-full left-0 bg-black w-64 p-2">
              {invites.length === 0 && <p>No invites</p>}
              {invites.map((room) => (
                <div
                  key={room.id}
                  className="flex justify-between items-center"
                >
                  <p>{room.name}</p>
                  <div className="flex">
                    <button
                      className="mr-2"
                      onClick={() => {
                        acceptRoomInvite(room.id);
                      }}
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => {
                        rejectRoomInvite(room.id);
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <p className="mr-5">
          Balance: <span className="font-bold">{balance?.toFixed(2)}₺</span>
        </p>
        <AuthStatus />
      </div>
    </div>
  );
};

export default Navbar;
