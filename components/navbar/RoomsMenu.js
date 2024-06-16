import Link from "next/link";
import React from "react";

const RoomsMenu = ({ rooms, setRoomsMenuOpen, roomId }) => {
  return (
    <div className="absolute top-full left-0 w-32">
      {rooms.map((room) => (
        <Link
          key={room.id}
          href={`/room/${room.id}`}
          className={`p-2 w-full text-background block ${roomId === room.id ? "bg-primary-brighter" : "bg-primary"} hover:bg-primary-brighter`}
          onClick={() => setRoomsMenuOpen(false)}
        >
          <p>{room.name}</p>
        </Link>
      ))}
      <Link
        className="p-2 w-full text-background block bg-secondary"
        href="/room/create"
        onClick={() => setRoomsMenuOpen(false)}
      >
        Create Room
      </Link>
    </div>
  );
};

export default RoomsMenu;
