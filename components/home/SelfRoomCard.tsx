import { IRoomUser } from "@/types/IRoom.model";
import Link from "next/link";

interface ISelfRoomCardProps {
  roomUser: IRoomUser;
}

const SelfRoomCard = ({ roomUser }: ISelfRoomCardProps) => {
  return (
    <Link href={`/home/room/${roomUser.room.id}/guess`} className="inline-block mx-1"> 
      <div className="rounded-md btn-gradient w-48 h-48 p-2 text-white">
        <div>
          <p className="opacity-50">Room Name</p>
          <h2>{roomUser.room.name}</h2>
        </div>
        <div>
          <p className="opacity-50">Owner</p>
          <p>{roomUser.room.owner.username}</p>
        </div>
        <div>
          <p className="opacity-50">Member Count</p>
          <p>{roomUser.memberCount}</p>
        </div>
        <div>
          <p className="opacity-50">Balance</p>
          <p>{roomUser.balance.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
};

export default SelfRoomCard;
