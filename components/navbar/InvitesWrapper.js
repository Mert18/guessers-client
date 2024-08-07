"use client";
import React from "react";
import InvitesMenu from "./InvitesMenu";
import { acceptRoomInvite, rejectRoomInvite } from "@/api/room";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const InvitesWrapper = ({
  invitesMenuRef,
  setInvitesMenuOpen,
  invitesMenuOpen,
  invites,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="relative w-32 text-text text-xs mr-8 h-full"
      ref={invitesMenuRef}
    >
      <button
        className="flex items-center bg-background3 text-text p-3 justify-between w-full"
        onClick={() => setInvitesMenuOpen(!invitesMenuOpen)}
      >
        {invites.length > 0 && (
          <span className="w-3 h-3 bg-primary rounded-full"></span>
        )}
        <p>{t("invites")}</p>
        <Image src="/arrow.svg" alt="arrow" width={10} height={10} />
      </button>
      {invitesMenuOpen && (
        <InvitesMenu
          invites={invites}
          acceptRoomInvite={acceptRoomInvite}
          rejectRoomInvite={rejectRoomInvite}
        />
      )}
    </div>
  );
};

export default InvitesWrapper;
