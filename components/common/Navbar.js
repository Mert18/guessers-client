"use client";
import React from "react";
import Logo from "./Logo";
import PrimaryButton from "./button/PrimaryButton";
import { t } from "i18next";
import { signOut, useSession } from "next-auth/react";

async function keycloakSessionLogOut() {
  try {
    await fetch(`/api/auth/logout`, { method: "GET" });
  } catch (err) {}
}

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="col-start-1 col-end-13 flex flex-col justify-between items-center text-text bg-background border-b border-primary">
      <div className="w-full flex justify-center items-center my-4">
        <Logo />
      </div>
      <div className="w-full flex justify-center items-center text-xs">
        <PrimaryButton text={t("home")} href="/home" mr={true} />

        <PrimaryButton text={t("invites")} href="/home/invites" mr={true} />

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
          href={`/`}
          onClick={() => {
            keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
