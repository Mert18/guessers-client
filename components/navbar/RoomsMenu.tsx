"use client";
import { IRoomUser } from "@/types/IRoom.model";
import Link from "next/link";

interface IRoomsMenuProps {
  roomUsers: IRoomUser[];
  setRoomsMenuOpen: (value: boolean) => void;
  roomId: string;
}

const RoomsMenu = ({ roomUsers, setRoomsMenuOpen, roomId }: IRoomsMenuProps) => {
  return (
    <div className="absolute top-full left-0 w-32 bg-background2">
      {roomUsers?.map((roomUser) => (
        <Link
          key={roomUser.room.id}
          href={`/home/room/${roomUser.room.id}`}
          className={`p-2 w-full block ${
            roomId === roomUser.room.id ? "bg-primary" : ""
          } hover:bg-secondary`}
          onClick={() => setRoomsMenuOpen(false)}
        >
          <p className="p-2 text-text">{roomUser.room.name}</p>
        </Link>
      ))}
    </div>
  );
};

export default RoomsMenu;
