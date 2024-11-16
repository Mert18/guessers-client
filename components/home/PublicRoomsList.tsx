import PublicRoomCard from "./PublicRoomCard";
import ComponentTitle from "../common/ComponentTitle";
import Loader from "../common/Loader";
import { IRoomBasic } from "@/types/IRoom.model";
import { IPaging } from "@/types/IRequest.model";

interface IPublicRoomsListProps {
  publicRooms: IRoomBasic[];
  paging: IPaging;
  setPaging: (paging: IPaging) => void;
  loading: boolean;
}

const PublicRoomsList = ({ publicRooms, paging, setPaging, loading }: IPublicRoomsListProps) => {
  const publicRoomsListRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (publicRooms.length === 0) {
      return <p className="text-primary">No public rooms available.</p>;
    } else {
      return (
        <div className="w-full">
          <div className="bg-background flex justify-start items-center text-primary border-b border-primary">
            <h2 className="flex-1">{"roomName"}</h2>
            <h2 className="flex-1">{"owner"}</h2>
            <h2 className="flex-1">{"memberCount"}</h2>
            <h2 className="flex-1">{"join"}</h2>
          </div>

          {publicRooms?.map((room) => (
            <PublicRoomCard key={room.id} room={room} />
          ))}
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-xs">
      <ComponentTitle text="Public rooms" icon="door-open.svg" />
      {publicRoomsListRenderer()}
    </div>
  );
};

export default PublicRoomsList;
