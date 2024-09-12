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
  const params = useParams();
  const [roomUser, setRoomUser] = useState({});
  const { data: session, status } = useSession();

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
        {roomUser?.balance >= 0 && (
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

        <PrimaryButton
          text={t("roomCreate")}
          href="/home/room/create"
          noBg={true}
        />

        <PrimaryButton
          text={t("profile")}
          href={`/home/profile/${session.username}`}
          noBg={true}
        />

        <PrimaryButton
          text={t("logout")}
          noBg={true}
          onClick={() => {
            keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
