import Image from "next/image";
import React from "react";

const InvitesMenu = ({ invites, acceptRoomInvite, rejectRoomInvite }) => {
  return (
    <div className="absolute top-full left-0 bg-black text-background w-48 p-2">
      {invites.length === 0 && <p>No invites</p>}
      {invites.map((room) => (
        <div key={room.id} className="flex justify-between items-center">
          <div className="w-32 whitespace-nowrap overflow-ellipsis overflow-hidden text-background">
            <p>{room.name}</p>
          </div>
          <div className="flex">
            <button
              className="mr-2"
              onClick={() => {
                acceptRoomInvite(room.id).finally(() => {
                  window.location.reload();
                });
              }}
            >
              <Image src="/check.svg" alt="check" width={15} height={15} />
            </button>
            <button
              onClick={() => {
                rejectRoomInvite(room.id).finally(() => {
                  window.location.reload();
                });
              }}
            >
              <Image src="/cross.svg" alt="cross" width={15} height={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvitesMenu;
