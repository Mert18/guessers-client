import ComponentTitle from "../common/ComponentTitle";
import SelfRoomCard from "./SelfRoomCard";
import Pager from "../common/Pager";
import Loader from "../common/Loader";
import { IRoomUser } from "@/types/IRoom.model";
import { IPaging } from "@/types/IRequest.model";

interface ISelfRoomsListProps {
  selfRooms: IRoomUser[];
  paging: IPaging;
  setPaging: (paging: IPaging) => void;
  loading: boolean;
}

const SelfRoomsList = ({ selfRooms, paging, setPaging, loading }: ISelfRoomsListProps) => {
  const selfRoomsListRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (selfRooms.length === 0) {
      return <p className="text-primary">You have not attended any rooms.</p>;
    } else {
      return (
        <div className="w-full">
          <div className="bg-background flex justify-start items-center text-primary border-b border-primary">
            <h2 className="flex-1">{"roomName"}</h2>
            <h2 className="flex-1">{"owner"}</h2>
            <h2 className="flex-1">{"memberCount"}</h2>
            <h2 className="flex-1">{"public"}</h2>
            <h2 className="flex-1">{"balance"}</h2>
          </div>
          {selfRooms.map((room) => (
            <SelfRoomCard key={room.id} roomUser={room} />
          ))}
          <Pager paging={paging} setPaging={setPaging} />
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text="Your rooms" icon="/door.svg" />
      {selfRoomsListRenderer()}
    </div>
  );
};

export default SelfRoomsList;
