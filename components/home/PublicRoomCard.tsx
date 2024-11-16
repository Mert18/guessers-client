import PrimaryButton from "../common/button/PrimaryButton";
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
    <div className="w-full text-text">
      <div className="bg-background flex justify-start items-center text-text border-b border-primary">
        <h2 className="flex-1">{room.name}</h2>
        <p className="flex-1">{room.owner.username}</p>
        <p className="flex-1">{room.memberCount}</p>
        <div className="flex-1">
          <PrimaryButton type="button" onClick={handleJoinRoom} text="Join"  />
        </div>
      </div>
    </div>
  );
};

export default PublicRoomCard;
