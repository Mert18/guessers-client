"use client";
import React, { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { getInvites } from "@/api/user";
import InvitesWrapper from "../navbar/InvitesWrapper";
import PrimaryButton from "./button/PrimaryButton";
import { t } from "i18next";
import { useParams } from "next/navigation";
import { getRoomUser } from "@/api/room";
import { signOut, useSession } from "next-auth/react";

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {
  }
}

const Navbar = () => {
  const [invitesMenuOpen, setInvitesMenuOpen] = useState(false);
  const [invites, setInvites] = useState([]);
  const invitesMenuRef = useRef(null);
  
  
  const { data: session, status } = useSession();

  useEffect(() => {
    getInvites().then((response) => {
      setInvites(response.data);
    });
  }, []);
  

  useEffect(() => {
    const handleClickOutside = (event) => {
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
    <div className="col-start-1 col-end-13 flex flex-col justify-between items-center text-text bg-background border-b border-primary">
      <div className="w-full flex justify-center items-center">
        <Logo />
      </div>
      <div className="w-full flex justify-center items-center text-xs">
        <InvitesWrapper
          invitesMenuRef={invitesMenuRef}
          setInvitesMenuOpen={setInvitesMenuOpen}
          invitesMenuOpen={invitesMenuOpen}
          invites={invites}
        />

        <PrimaryButton
          text={t("roomCreate")}
          href="/home/room/create"
          
          mr={true}
        />

        <PrimaryButton
          text={t("profile")}
          href={`/home/profile/${session.username}`}
          
          mr={true}
        />

        <PrimaryButton
          text={t("logout")}
          
          onClick={() => {
            keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
