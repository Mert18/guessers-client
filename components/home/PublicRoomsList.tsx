import PublicRoomCard from "./PublicRoomCard";
import ComponentTitle from "../common/ComponentTitle";
import Loader from "../common/Loader";
import { IRoomBasic } from "@/types/IRoom.model";
import { IPaging } from "@/types/IRequest.model";
import CustomButton from "../common/CustomButton";
import Image from "next/image";
import EmptyState from "../common/EmptyState";

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
      return (
        <EmptyState
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          title="No Public Rooms Available"
          description="There are currently no public rooms to join. Create your own room and invite your friends to get started!"
          actionText="Create a Room"
          actionLink="/home/room/create"
        />
      );
    } else {
      return (
        <div className="flex flex-nowrap max-w-full overflow-x-auto">
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
    <div className="mt-4">
      <ComponentTitle text="Public rooms"
      icon={<Image src={"/icons/globe.svg"} width={20} height={20} alt="envelope" />}
      />
      {publicRoomsListRenderer()}
    </div>
  );
};

export default PublicRoomsList;
