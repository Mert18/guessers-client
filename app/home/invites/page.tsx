"use client";
import { acceptRoomInvite, rejectRoomInvite } from "@/api/room";
import { getInvites } from "@/api/user";
import ComponentTitle from "@/components/common/ComponentTitle";
import { IPendingInvite } from "@/types/IUser.model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Invites = () => {
  const [pendingInvites, setPendingInvites] = useState<IPendingInvite[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchInvites = async () => {
      await getInvites().then((response) => {
        setPendingInvites(response.data);
      });
    };

    fetchInvites();
  }, []);
  return (
    <div className="w-full text-xs my-8">
      <ComponentTitle
        text={"invites" + " (" + pendingInvites.length + ")"}
        icon="/invite.svg"
      />

      {pendingInvites.length === 0 ? (
        <p className="text-primary">You do not have any room invites.</p>
      ) : (
        <div className="bg-primary-default p-2 rounded-md flex justify-start items-center text-background-bright font-bold border-2 border-primary-default">
          <h2 className="flex-1">{"Room Name"}</h2>
          <h2 className="flex-1">{"Options"}</h2>
        </div>
      )}

      {pendingInvites.map((invite) => (
        <div key={invite.room.id} className="flex justify-start items-center bg-background-bright my-1 text-primary-default border-2 border-primary-default hover:bg-primary-default hover:text-background-bright hover:-translate-y-1 transition-all px-2 py-3 rounded-md">
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
      ))}
    </div>
  );
};

export default Invites;
