"use client";
import { IRoomUser } from "@/types/IRoom.model";
import RoomName from "./RoomName";
import OwnerActions from "../OwnerActions";
import Image from "next/image";
import ComponentTitle from "@/components/common/ComponentTitle";

interface IRoomHeaderProps {
  roomUser: IRoomUser;
}

const RoomHeader = ({ roomUser }: IRoomHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-4">
      <ComponentTitle
        text="Room Name"
        icon={
          <Image src={"/icons/roomdoor.svg"} width={20} height={20} alt="roomn" />
        }
      />
      <RoomName roomName={roomUser?.room?.name} />

      {roomUser.owner && roomUser?.room?.id && (
        <OwnerActions roomId={roomUser?.room?.id} />
      )}
    </div>
  );
};

export default RoomHeader;
