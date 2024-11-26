"use client";
import RoomName from "./RoomName";
import PrimaryButton from "../common/button/PrimaryButton";
import { IRoomUser } from "@/types/IRoom.model";
import ComponentTitle from "../common/ComponentTitle";

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
          <p className="text-text-default text-center text-xs">Your balance: <span className="font-bold text-base">{roomUser?.balance}</span></p>
      </div>
    </div>
  );
};

export default RoomHeader;
