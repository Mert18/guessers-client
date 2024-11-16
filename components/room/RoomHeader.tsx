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
        <div className="text-xs flex justify-center items-center">
          <PrimaryButton
            type="button"
            href={`/home/room/${roomUser?.room?.id}/event/create`}
            text={"eventCreate"}
            mr={true}
          />
          <PrimaryButton
            type="button"
            href={`/home/room/${roomUser?.room?.id}/create-prize`}
            text={"createPrize"}
            mr={true}
          />
          <PrimaryButton
            type="button"
            href={`/home/room/${roomUser?.room?.id}/invite`}
            text={"invite"}
            mr={true}
          />
          <PrimaryButton
            type="button"
            href={`/home/room/${roomUser?.room?.id}/lendtoken`}
            text={"lendToken"}
          />
        </div>
      )}
      <div className="w-full">
        <ComponentWithHeader name={"room"}>
          <RoomName roomName={roomUser?.room?.name} />
        </ComponentWithHeader>
      </div>
    </div>
  );
};

export default RoomHeader;
