import PublicRoomCard from "./PublicRoomCard";
import ComponentTitle from "../common/ComponentTitle";
import Loader from "../common/Loader";
import { IRoomBasic } from "@/types/IRoom.model";
import { IPaging } from "@/types/IRequest.model";
import CustomButton from "../common/CustomButton";

interface IPublicRoomsListProps {
  publicRooms: IRoomBasic[];
  paging: IPaging;
  setPaging: React.Dispatch<React.SetStateAction<IPaging>>;
  loading: boolean;
}

const PublicRoomsList = ({
  publicRooms,
  paging,
  setPaging,
  loading,
}: IPublicRoomsListProps) => {
  const handleLoadMoreRooms = () => {
    setPaging((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const publicRoomsListRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (publicRooms?.length === 0) {
      return <p className="text-primary">No public rooms available.</p>;
    } else {
      return (
        <div className="flex flex-nowrap max-w-full overflow-x-auto py-2">
          {publicRooms?.map((room) => (
            <PublicRoomCard key={room.id} room={room} />
          ))}
          {paging.totalElements !== publicRooms.length && (
            <div className="w-48">
              <CustomButton
                onClick={() => handleLoadMoreRooms()}
                type="button"
                text="Load More >>>"
                bg={true}
              />
            </div>
          )}
        </div>
      );
    }
  };
  return (
    <div className="my-8 text-sm">
      <ComponentTitle text="Public rooms" icon="door-open.svg" />
      {publicRoomsListRenderer()}
    </div>
  );
};

export default PublicRoomsList;
