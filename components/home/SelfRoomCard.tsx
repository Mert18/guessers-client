import { IRoomUser } from "@/types/IRoom.model";
import Link from "next/link";

interface ISelfRoomCardProps {
  roomUser: IRoomUser;
}

const SelfRoomCard = ({ roomUser }: ISelfRoomCardProps) => {
  return (
    <Link
      href={`/home/room/${roomUser.room.id}/guess`}
      className="w-full font-bold"
    >
      <div className="flex justify-start items-center bg-background-bright my-1 text-primary-default border-2 border-primary-default hover:bg-primary-default hover:text-background-bright hover:-translate-y-0.5 transition-all px-2 py-3">
        <h2 className="flex-1">{roomUser.room.name}</h2>
        <p className="flex-1">{roomUser.room.owner.username}</p>
        <p className="flex-1">{roomUser.memberCount}</p>
      </div>
    </Link>
  );
};

export default SelfRoomCard;
