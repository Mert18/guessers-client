"use client";
import InvitesMenu from "./InvitesMenu";
import { acceptRoomInvite, rejectRoomInvite } from "@/api/room";

interface IInvitesWrapperProps {
  invitesMenuRef: any;
  setInvitesMenuOpen: any;
  invitesMenuOpen: boolean;
  invites: any;
}

const InvitesWrapper = ({
  invitesMenuRef,
  setInvitesMenuOpen,
  invitesMenuOpen,
  invites,
}: IInvitesWrapperProps) => {

  return (
    <div
      className="relative text-text text-xs h-full flex justify-center items-center z-50"
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
          <p>{"invites"}</p>
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
