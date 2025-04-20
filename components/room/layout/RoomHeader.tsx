"use client";
import CustomButton from "../../common/CustomButton";
import { IRoomUser } from "@/types/IRoom.model";
import TokenSymbol from "../../common/TokenSymbol";
import RoomName from "./RoomName";
import OwnerActions from "../OwnerActions";

interface IRoomHeaderProps {
  roomUser: IRoomUser;
}

const RoomHeader = ({ roomUser }: IRoomHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full my-4">
      <div className="w-full">
        <RoomName roomName={roomUser?.room?.name} />
      </div>
      {roomUser.owner && roomUser?.room?.id && (
        <OwnerActions roomId={roomUser?.room?.id} />
      )}
    </div>
  );
};

export default RoomHeader;
