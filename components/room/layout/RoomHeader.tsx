"use client";
import PrimaryButton from "../../common/button/PrimaryButton";
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
        <p className="text-center text-xs flex flex-col items-center justify-center text-primary-default">
          <p>Your Balance</p>
          <div className="flex justify-center items-center">
            <span className="font-bold text-base">{roomUser?.balance}</span>
            <TokenSymbol />
          </div>
        </p>
      </div>
      {roomUser.owner && roomUser?.room?.id && (
        <OwnerActions roomId={roomUser?.room?.id} />
      )}
    </div>
  );
};

export default RoomHeader;
