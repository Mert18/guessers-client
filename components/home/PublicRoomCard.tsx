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
    <div className="flex flex-col mr-2 justify-between rounded-md bg-white-dark w-48 h-48 p-2 text-primary border border-primary">
      <div className="">
        <div>
          <p className="opacity-50">Room Name</p>
          <h2>{room.name}</h2>
        </div>
        <div>
          <p className="opacity-50">Owner</p>
          <p>{room.owner.username}</p>
        </div>
        <div>
          <p className="opacity-50">Member Count</p>
          <p>{room.memberCount}</p>
        </div>
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
  );
};

export default PublicRoomCard;
