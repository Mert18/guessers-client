"use client";
import { getInvites } from "@/api/user";
import { IPaging } from "@/types/IRequest.model";
import { IPendingInvite } from "@/types/IUser.model";
import { useEffect, useState } from "react";
import ComponentTitle from "../common/ComponentTitle";
import Pager from "../common/table/Pager";
import PendingInviteCard from "./PendingInviteCard";
import TableEmptyInfo from "../common/table/TableEmptyInfo";

const InvitesContent = () => {
  const [pendingInvites, setPendingInvites] = useState<IPendingInvite[]>([]);
  const [invitesPaging, setInvitesPaging] = useState<IPaging>({
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });

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
        <TableEmptyInfo text="You do not have any room invites." />
      ) : (
        <>
          <div className="bg-primary-default p-2 flex justify-start items-center text-background-bright font-bold border-2 border-primary-default">
            <h2 className="flex-1">{"Room Name"}</h2>
            <h2 className="flex-1">{"Options"}</h2>
          </div>
          {pendingInvites?.map((invite: IPendingInvite) => (
            <PendingInviteCard key={invite.id} invite={invite} />
          ))}
          <Pager paging={invitesPaging} setPaging={setInvitesPaging} />
        </>
      )}
    </div>
  );
};

export default InvitesContent;
