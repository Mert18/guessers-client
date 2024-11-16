import { IRoomUser } from "@/types/IRoom.model";
import Link from "next/link";

interface ISelfRoomCardProps {
  roomUser: IRoomUser;
}

const SelfRoomCard = ({ roomUser }: ISelfRoomCardProps) => {
  return (
    <Link
      href={`/home/room/${roomUser.room.id}/guess`}
      className="w-full text-text"
    >
      <div className="bg-background flex justify-start items-center text-text border-b border-primary hover:bg-backgroundhover transition-all py-2">
        <h2 className="flex-1">{roomUser.room.name}</h2>
        <p className="flex-1">{roomUser.room.owner.username}</p>
        <p className="flex-1">{roomUser.memberCount}</p>
        <p className="flex-1">{roomUser.room.public ? <span>{"yes"}</span> : <span>{"no"}</span>}</p>
        <p className="flex-1">{roomUser.balance.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default SelfRoomCard;
