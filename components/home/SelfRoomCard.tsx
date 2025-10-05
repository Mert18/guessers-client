import { IRoomUser } from "@/types/IRoom.model";
import CustomLink from "../common/CustomLink";

interface ISelfRoomCardProps {
  roomUser: IRoomUser;
}

const SelfRoomCard = ({ roomUser }: ISelfRoomCardProps) => {
  return (
    <div className="flex flex-col mr-2 justify-between rounded-md bg-gradient-white w-48 h-48 p-2 text-primary border border-primary">
      <div>
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
      </div>
      <div className="w-full">
        <CustomLink
          href={`/home/room/${roomUser.room.id}/guess`}
          text="Enter Room"
          bg={true}
        />
      </div>
    </div>
  );
};

export default SelfRoomCard;
