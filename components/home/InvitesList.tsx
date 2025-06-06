import React, { useEffect, useState } from "react";
import { getInvites } from "@/api/user";
import ComponentTitle from "../common/ComponentTitle";
import PendingInviteCard from "./PendingInviteCard";
import { IPendingInvite } from "@/types/IUser.model";
import { IPaging } from "@/types/IRequest.model";
import CustomButton from "../common/CustomButton";
import Image from "next/image";

const InvitesList = () => {
  const [pendingInvites, setPendingInvites] = useState<IPendingInvite[]>([]);
  const [invitesPaging, setInvitesPaging] = useState<IPaging>({
    page: 0,
    size: 5,
    totalPages: 0,
    totalElements: 0,
  });

  const fetchInvites = async () => {
    await getInvites(invitesPaging).then((response) => {
      setPendingInvites([...pendingInvites, ...response.data.content]);
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

  const handleLoadMoreInvites = () => {
    setInvitesPaging((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };
  return (
    <div className="w-full text-lg my-8">
      <ComponentTitle
        text={"invites" + " (" + pendingInvites?.length + ")"}
        icon={<Image src={"/icons/envelope.svg"} width={20} height={20} alt="envelope" />}
      />

      {pendingInvites?.length === 0 ? (
        <p className="text-primary px-1">You do not have any room invites.</p>
      ) : (
        <>
          <div className="flex flex-nowrap max-w-full overflow-x-auto py-2 text-lg">
            {pendingInvites?.map((invite: IPendingInvite) => (
              <PendingInviteCard key={invite.id} invite={invite} />
            ))}
            {invitesPaging.totalElements !== pendingInvites.length && (
              <div className="w-48">
                <CustomButton
                  onClick={() => handleLoadMoreInvites()}
                  type="button"
                  text="Load More >>>"
                  bg={true}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default InvitesList;
