import { joinPublicRoom } from "@/api/room";
import { IRoomBasic } from "@/types/IRoom.model";
import TableCardWrapper from "../common/table/TableCardWrapper";

interface IPublicRoomCardProps {
  room: IRoomBasic;
}

const PublicRoomCard = ({ room }: IPublicRoomCardProps) => {
  const handleJoinRoom = () => {
    joinPublicRoom(room.id).finally(() => {
      window.location.reload();
    });
  };
  return (
    <TableCardWrapper changeBgOnHover={false}>
      <h2 className="flex-1">{room.name}</h2>
      <p className="flex-1">{room.owner.username}</p>
      <p className="flex-1">{room.memberCount}</p>
      <div className="flex-1">
        <button
          className="bg-primary-default hover:bg-primary-bright text-xs text-background-bright"
          onClick={() => handleJoinRoom()}
        >
          Join
        </button>
      </div>
    </TableCardWrapper>
  );
};

export default PublicRoomCard;
