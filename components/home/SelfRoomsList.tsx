import ComponentTitle from "../common/ComponentTitle";
import SelfRoomCard from "./SelfRoomCard";
import Loader from "../common/Loader";
import { IRoomUser } from "@/types/IRoom.model";
import { IPaging } from "@/types/IRequest.model";
import Link from "next/link";
import CustomButton from "../common/CustomButton";
import { ColorEnum } from "@/enum/enum";
import Image from "next/image";

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
        <p className="px-1">
          You have not attended any rooms.{" "}
          <Link
            href={"/home/room/create"}
            className="underline text-secondary hover:text-secondary-dark"
          >
            Create a new room.
          </Link>
        </p>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };
  return (
    <div className="text-sm">
      <ComponentTitle text="Your rooms" icon={<Image src={"/icons/roomdoor.svg"} width={20} height={20} alt="door" />}/>
      {selfRoomsListRenderer()}
    </div>
  );
};

export default SelfRoomsList;
