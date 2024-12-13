"use client";
import PrimaryButton from "../../common/button/PrimaryButton";
import { IRoomUser } from "@/types/IRoom.model";
import ComponentTitle from "../../common/ComponentTitle";
import TokenSymbol from "../../common/TokenSymbol";
import RoomName from "./RoomName";

interface IRoomHeaderProps {
  roomUser: IRoomUser;
}

const RoomHeader = ({ roomUser }: IRoomHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full my-4">
      {roomUser.owner && (
        <div className="w-full">
          <ComponentTitle text={"Owner Actions"} />
          <div className="text-xs flex justify-center items-center w-full gap-2">
            <PrimaryButton
              type="button"
              href={`/home/room/${roomUser?.room?.id}/event/create`}
              text={"Create Event"}
            />
            <PrimaryButton
              type="button"
              href={`/home/room/${roomUser?.room?.id}/create-prize`}
              text={"Create Prize"}
            />
            <PrimaryButton
              type="button"
              href={`/home/room/${roomUser?.room?.id}/invite`}
              text={"Invite People"}
            />
            <PrimaryButton
              type="button"
              href={`/home/room/${roomUser?.room?.id}/lendtoken`}
              text={"Lend Token"}
            />
          </div>
        </div>
      )}
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
    </div>
  );
};

export default RoomHeader;
