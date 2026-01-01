import ComponentTitle from "../common/ComponentTitle";
import SelfRoomCard from "./SelfRoomCard";
import Loader from "../common/Loader";
import { IRoomUser } from "@/types/IRoom.model";
import { IPaging } from "@/types/IRequest.model";
import Link from "next/link";
import CustomButton from "../common/CustomButton";
import { ColorEnum } from "@/enum/enum";
import Image from "next/image";
import EmptyState from "../common/EmptyState";

interface ISelfRoomsListProps {
  selfRooms: IRoomUser[];
  paging: IPaging;
  setPaging: React.Dispatch<React.SetStateAction<IPaging>>;
  loading: boolean;
}

const SelfRoomsList = ({
  selfRooms,
  paging,
  setPaging,
  loading,
}: ISelfRoomsListProps) => {
  const handleLoadMoreRooms = () => {
    setPaging((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };
  const selfRoomsListRenderer = () => {
    if (loading) {
      return <Loader />;
    } else if (selfRooms?.length === 0) {
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          }
          title="No Rooms Yet"
          description="You haven't joined any prediction rooms yet. Create your first room to start making predictions with your friends!"
          actionText="Create Your First Room"
          actionLink="/home/room/create"
        />
      );
    } else {
      return (
          <div className="flex flex-nowrap max-w-full overflow-x-auto">
            {selfRooms?.map((room) => (
              <SelfRoomCard key={room.id} roomUser={room} />
            ))}
            {paging.totalElements !== selfRooms.length && (
              <div className="w-48">
                <CustomButton
                  onClick={() => handleLoadMoreRooms()}
                  type="button"
                  text="Load More >>>"
                  bg={true}
                  color={ColorEnum.SECONDARY}
                />
              </div>
            )}
          </div>
      );
    }
  };
  return (
    <div>
      <ComponentTitle text="Your rooms" icon={<Image src={"/icons/roomdoor.svg"} width={20} height={20} alt="door" />}/>
      {selfRoomsListRenderer()}
    </div>
  );
};

export default SelfRoomsList;
