"use client";
import { acceptRoomInvite, rejectRoomInvite } from "@/api/room";
import { getInvites } from "@/api/user";
import ComponentTitle from "@/components/common/ComponentTitle";
import Pager from "@/components/common/Pager";
import { IPaging } from "@/types/IRequest.model";
import { IPendingInvite } from "@/types/IUser.model";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Invites = () => {
  const [pendingInvites, setPendingInvites] = useState<IPendingInvite[]>([]);
  const [invitesPaging, setInvitesPaging] = useState<IPaging>({
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });

  const router = useRouter();

  const fetchInvites = async () => {
    await getInvites(invitesPaging).then((response) => {
      setPendingInvites(response.data.content);
      setInvitesPaging({
        page: response.data.page.number,
        size: response.data.page.size,
        totalPages: response.data.page.totalPages,
        totalElements: response.data.page.totalElements,
      });
    });
  };

  useEffect(() => {
    fetchInvites();
  }, [invitesPaging.page]);
  
  return (
    <div className="w-full text-xs my-8">
      <ComponentTitle
        text={"invites" + " (" + pendingInvites?.length + ")"}
        icon="/invite.svg"
      />

      {pendingInvites?.length === 0 ? (
        <p className="text-primary">You do not have any room invites.</p>
      ) : (
        <>
          <div className="bg-primary-default p-2 rounded-md flex justify-start items-center text-background-bright font-bold border-2 border-primary-default">
            <h2 className="flex-1">{"Room Name"}</h2>
            <h2 className="flex-1">{"Options"}</h2>
          </div>
          {pendingInvites?.map((invite) => (
            <div
              key={invite.room.id}
              className="flex justify-start items-center bg-background-bright my-1 text-primary-default border-2 border-primary-default transition-all px-2 py-3 rounded-md"
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
          ))}
          <Pager paging={invitesPaging} setPaging={setInvitesPaging} />
        </>
      )}
    </div>
  );
};

export default Invites;
