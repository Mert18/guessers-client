import React from "react";

const InvitesMenu = ({
  invites,
  acceptRoomInvite,
  rejectRoomInvite,
}) => {
  return (
    <div className="absolute top-full left-0 bg-black w-64 p-2">
      {invites.length === 0 && <p>No invites</p>}
      {invites.map((room) => (
        <div key={room.id} className="flex justify-between items-center">
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
  );
};

export default InvitesMenu;
