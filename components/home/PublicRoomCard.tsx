import { joinPublicRoom } from "@/api/room";
import { IRoomBasic } from "@/types/IRoom.model";
import CustomButton from "../common/CustomButton";

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
    <div className="inline-block mx-1">
      <div className="rounded-md bg-primary-dark w-48 h-48 p-2 text-white">
        <div>
          <p className="opacity-50">Room Name</p>
          <h2>{room.name}</h2>
        </div>
        <div>
          <p className="opacity-50">Owner</p>
          <p>{room.owner.username}</p>
        </div>
        <div>
          <p className="opacity-50">Room Name</p>
          <p>{room.memberCount}</p>
        </div>
        <div>
          <CustomButton
            type="button"
            text="Join"
            onClick={() => handleJoinRoom()}
            bg={true}
          />
        </div>
      </div>
    </div>
  );
};

export default PublicRoomCard;
