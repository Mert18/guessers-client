import PublicRoomCard from "./PublicRoomCard";
import ComponentTitle from "../common/ComponentTitle";
import Loader from "../common/Loader";
import { IRoomBasic } from "@/types/IRoom.model";
import { IPaging } from "@/types/IRequest.model";
import Pager from "../common/Pager";

interface IPublicRoomsListProps {
  publicRooms: IRoomBasic[];
  paging: IPaging;
  setPaging: React.Dispatch<React.SetStateAction<IPaging>>;
  loading: boolean;
}

const PublicRoomsList = ({ publicRooms, paging, setPaging, loading }: IPublicRoomsListProps) => {
  const publicRoomsListRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (publicRooms?.length === 0) {
      return <p className="text-primary">No public rooms available.</p>;
    } else {
      return (
        <div className="w-full">
          <div className="bg-primary-default p-2 rounded-md flex justify-start items-center text-background-bright font-bold border-2 border-primary-default">
            <h2 className="flex-1">{"Room Name"}</h2>
            <h2 className="flex-1">{"Owner"}</h2>
            <h2 className="flex-1">{"Members"}</h2>
            <h2 className="flex-1">{"Join"}</h2>
          </div>

          {publicRooms?.map((room) => (
            <PublicRoomCard key={room.id} room={room} />
          ))}
          
          <Pager paging={paging} setPaging={setPaging} />
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
