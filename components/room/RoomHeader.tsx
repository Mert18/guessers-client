"use client";
import RoomName from "./RoomName";
import ComponentWithHeader from "../common/ComponentWithHeader";
import PrimaryButton from "../common/button/PrimaryButton";
import { IRoomUser } from "@/types/IRoom.model";

interface IRoomHeaderProps {
  roomUser: IRoomUser;
}

const RoomHeader = ({ roomUser }: IRoomHeaderProps) => {

  return (
    <div className="flex flex-col items-center justify-center">
      {roomUser.owner && (
        <div className="text-xs flex justify-center items-center w-full my-4">
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
      )}
      <div className="w-full">
        <ComponentWithHeader name={"Room"}>
          <RoomName roomName={roomUser?.room?.name} />
        </ComponentWithHeader>
      </div>
    </div>
  );
};

export default RoomHeader;
