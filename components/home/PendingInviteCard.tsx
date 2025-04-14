"use client";
import { acceptRoomInvite, rejectRoomInvite } from "@/api/room";
import { IPendingInvite } from "@/types/IUser.model";
import { useRouter } from "next/navigation";
import CustomButton from "../common/CustomButton";
import { ColorEnum } from "@/enum/enum";

interface IPendingInviteCard {
  invite: IPendingInvite;
}

const PendingInviteCard = ({invite }: IPendingInviteCard) => {
  const router = useRouter();
  return (
    <div
      className="rounded-md gradient-primary-2 w-48 h-28 p-2 text-white flex flex-col justify-between"
    >
      <div className="whitespace-nowrap overflow-ellipsis overflow-hidden text-text flex-1">
        <p className="opacity-50">Room Name</p>
        <p>{invite.room.name}</p>
      </div>
      <div className="flex gap-1">
        <CustomButton
          type="button"
          text="Accept"
          bg={true}
          onClick={() => {
            acceptRoomInvite(invite.room.id).finally(() => {
              router.push("/home");
            });
          }}
          color={ColorEnum.SUCCESS}
        />
        <CustomButton
          type="button"
          text="Reject"
          bg={true}
          onClick={() => {
            rejectRoomInvite(invite.room.id).finally(() => {
              router.push("/home");
            });
          }}
          color={ColorEnum.FAILURE}
        />
      </div>
    </div>
  );
};

export default PendingInviteCard;
