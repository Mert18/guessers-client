import { IRoomUser } from "@/types/IRoom.model";
import Link from "next/link";
import TableCardWrapper from "../common/table/TableCardWrapper";

interface ISelfRoomCardProps {
  roomUser: IRoomUser;
}

const SelfRoomCard = ({ roomUser }: ISelfRoomCardProps) => {
  return (
    <Link
      href={`/home/room/${roomUser.room.id}/guess`}
      className="w-full"
    >
      <TableCardWrapper changeBgOnHover>
        <h2 className="flex-1">{roomUser.room.name}</h2>
        <p className="flex-1">{roomUser.room.owner.username}</p>
        <p className="flex-1">{roomUser.memberCount}</p>
      </TableCardWrapper>
    </Link>
  );
};

export default SelfRoomCard;
