"use client";
import { acceptRoomInvite, rejectRoomInvite } from "@/api/room";
import { getInvites } from "@/api/user";
import ComponentTitle from "@/components/common/ComponentTitle";
import { t } from "i18next";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Invites = () => {
  const [pendingInvites, setPendingInvites] = useState([]);

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
      <ComponentTitle text={t("invites") + " (" + pendingInvites.length + ")"} icon="/invite.svg" />
      <div className="bg-background flex justify-start items-center text-primary border-b border-primary">
        <h2 className="flex-1">{t("roomName")}</h2>
        <h2 className="flex-1">{t("options")}</h2>
      </div>

      {pendingInvites.length === 0 && <p>No invites</p>}
      {pendingInvites.map((invite) => (
        <div
          key={invite.room.id}
          className="w-full flex"
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
              <p className="hover:underline">{t("accept")}</p>
            </button>
            <button
              onClick={() => {
                rejectRoomInvite(invite.room.id).finally(() => {
                  router.push("/home");
                });
              }}
            >
              <p className="hover:underline">{t("reject")}</p>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Invites;
