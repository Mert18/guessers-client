"use client";
import React from "react";
import InvitesMenu from "./InvitesMenu";
import { acceptRoomInvite, rejectRoomInvite } from "@/api/room";
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
      className="relative text-text text-sm h-full flex justify-center items-center"
      ref={invitesMenuRef}
    >
      <button
        className="flex items-center text-primary p-3 justify-between w-full"
        onClick={() => setInvitesMenuOpen(!invitesMenuOpen)}
      >
        {invites?.length > 0 && (
          <span className="w-3 h-3 bg-primary rounded-full"></span>
        )}
        <div className="flex items-center">
          <p>{t("invites")}</p>
        </div>
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
