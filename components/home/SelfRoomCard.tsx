import { ISelfRoomCardProps } from "@/types/IRoom.model";
import Link from "next/link";

const SelfRoomCard = ({ roomUser }: ISelfRoomCardProps) => {
  return (
    <div className="rounded-md p-2 text-primary">
      <h2>{roomUser.room.name}</h2>
      <Link
        href={`/home/room/${roomUser.room.id}/guess`}
        className="inline-block gradient-primary text-white p-2 text-sm rounded-md hover:bg-primary-dark transition-colors"
      >
        Enter Room
      </Link>
    </div>
  );
};

export default SelfRoomCard;
