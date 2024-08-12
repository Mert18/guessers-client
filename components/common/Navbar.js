"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import HamburgerMenu from "../navbar/HamburgerMenu";
import { getInvites } from "@/api/user";
import InvitesWrapper from "../navbar/InvitesWrapper";
import PrimaryButton from "./button/PrimaryButton";
import { t } from "i18next";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { getRoomUser } from "@/api/room";

const Navbar = () => {
  const [invitesMenuOpen, setInvitesMenuOpen] = useState(false);
  const [hamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);
  const [invites, setInvites] = useState([]);
  const hamburgerMenuRef = useRef(null);
  const invitesMenuRef = useRef(null);
  const params = useParams();
  const [roomUser, setRoomUser] = useState({});

  useEffect(() => {
    getInvites().then((response) => {
      setInvites(response.data);
    });
  }, []);

  useEffect(() => {
    if (params?.roomId === undefined) return;
    getRoomUser(params?.roomId).then((response) => {
      setRoomUser(response.data);
    });
  }, [params?.roomId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
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
    <div className="flex justify-between items-center text-text bg-background p-2 border-b border-primary">
      <Logo />

      <div className="flex justify-end items-center text-text text-xs w-full">
        {roomUser.balance && (
          <div>
            <p className="font-bold text-primary">
              <span className="text-text">Balance: </span>
              {roomUser?.balance?.toFixed(2)}
            </p>
          </div>
        )}

        <InvitesWrapper
          invitesMenuRef={invitesMenuRef}
          setInvitesMenuOpen={setInvitesMenuOpen}
          invitesMenuOpen={invitesMenuOpen}
          invites={invites}
        />

        <div className="mr-8 flex justify-center items-center h-full">
          <PrimaryButton
            text={t("roomCreate")}
            href="/home/room/create"
            noBg={true}
          />
        </div>

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
