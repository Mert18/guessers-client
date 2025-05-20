import PublicRoomCard from "./PublicRoomCard";
import ComponentTitle from "../common/ComponentTitle";
import Loader from "../common/Loader";
import { IRoomBasic } from "@/types/IRoom.model";
import { IPaging } from "@/types/IRequest.model";
import CustomButton from "../common/CustomButton";
import Image from "next/image";

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
      return <p className="text-primary px-1 text-lg">No public rooms available.</p>;
    } else {
      return (
        <div className="flex flex-nowrap max-w-full overflow-x-auto py-2 text-lg">
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
    <div className="my-8">
      <ComponentTitle text="Public rooms"
      icon={<Image src={"/icons/globe.svg"} width={20} height={20} alt="envelope" />}
      />
      {publicRoomsListRenderer()}
    </div>
  );
};

export default PublicRoomsList;
