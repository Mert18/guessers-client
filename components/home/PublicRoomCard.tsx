import { joinPublicRoom } from "@/api/room";
import { IRoomBasic } from "@/types/IRoom.model";

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
    <div className="w-full font-bold">
      <div className="flex justify-start items-center bg-background-bright my-1 text-primary border-2 border-primary transition-all px-2 py-3">
        <h2 className="flex-1">{room.name}</h2>
        <p className="flex-1">{room.owner.username}</p>
        <p className="flex-1">{room.memberCount}</p>
        <div className="flex-1">
          <button className="bg-primary hover:bg-primary-bright p-2 text-sm text-background-bright" onClick={() => handleJoinRoom()}>
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default PublicRoomCard;
