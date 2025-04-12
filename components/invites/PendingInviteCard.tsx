"use client";
import { acceptRoomInvite, rejectRoomInvite } from "@/api/room";
import { IPendingInvite } from "@/types/IUser.model";
import { useRouter } from "next/navigation";

interface IPendingInviteCard {
  key: string;
  invite: IPendingInvite;
}

const PendingInviteCard = ({ key, invite }: IPendingInviteCard) => {
  const router = useRouter();
  return (
    <div
      key={key}
      className="flex justify-start items-center bg-background-bright my-1 text-primary border-2 border-primary transition-all px-2 py-3"
    >
      <div className="whitespace-nowrap overflow-ellipsis overflow-hidden text-text flex-1">
        <p>{invite.room.name}</p>
      </div>
      <div className="flex text-text flex-1">
        <button
          className="mr-2"
          onClick={() => {
            acceptRoomInvite(invite.room.id).finally(() => {
              router.push("/home");
            });
          }}
        >
          <p className="hover:underline">{"accept"}</p>
        </button>
        <button
          onClick={() => {
            rejectRoomInvite(invite.room.id).finally(() => {
              router.push("/home");
            });
          }}
        >
          <p className="hover:underline">{"reject"}</p>
        </button>
      </div>
    </div>
  );
};

export default PendingInviteCard;
