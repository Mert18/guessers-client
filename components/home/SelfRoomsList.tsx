import ComponentTitle from "../common/ComponentTitle";
import SelfRoomCard from "./SelfRoomCard";
import Pager from "../common/Pager";
import Loader from "../common/Loader";
import { IRoomUser } from "@/types/IRoom.model";
import { IPaging } from "@/types/IRequest.model";
import PrimaryButton from "../common/button/PrimaryButton";
import Link from "next/link";
import SecondaryButton from "../common/button/SecondaryButton";
import { useEffect, useRef } from "react";

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
        <p className="text-primary">
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
        <div>
          <div className="flex flex-nowrap max-w-full overflow-x-auto py-2">
            {selfRooms?.map((room) => (
              <SelfRoomCard key={room.id} roomUser={room} />
            ))}
            {paging.totalElements !== selfRooms.length && (
              <div className="w-96">
                <SecondaryButton
                  onClick={() => handleLoadMoreRooms()}
                  type="button"
                  text="Load More >>>"
                  bg={true}
                />
              </div>
            )}
          </div>
        </div>
      );
    }
  };
  return (
    <div className="text-sm">
      <ComponentTitle text="Your rooms" icon="/door.svg" />
      {selfRoomsListRenderer()}
    </div>
  );
};

export default SelfRoomsList;
