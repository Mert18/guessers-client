import Link from "next/link";
import React from "react";

const RoomsMenu = ({ rooms, setRoomsMenuOpen, roomId }) => {
  return (
    <div className="absolute top-full left-0 bg-black w-64 p-2">
      {rooms.map((room) => (
        <Link
          key={room.id}
          href={`/room/${room.id}`}
          className="p-2"
          onClick={() => setRoomsMenuOpen(false)}
        >
          <p>{room.name}</p>
        </Link>
      ))}
      <Link
        className="p-2 w-full"
        href="/room/create"
        onClick={() => setRoomsMenuOpen(false)}
      >
        Create Room
      </Link>
    </div>
  );
};

export default RoomsMenu;
