"use client";
import React, { useEffect, useState } from "react";
import { getRoomUser } from "@/api/room";
import RoomHeader from "@/components/room/RoomHeader";
import { t } from "i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RoomLayout = ({ params, children }) => {
  const [loading, setLoading] = useState(false);
  const [roomUser, setRoomUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchRoomUser = async () => {
      setLoading(true);
      try {
        const userResponse = await getRoomUser(params.roomId);
        setRoomUser(userResponse.data);
      } catch (error) {
        console.error("Failed to fetch room user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomUser();
  }, [params.roomId]);

  if (!roomUser) return;
  return (
    <div>
      <RoomHeader roomUser={roomUser} />
      <div className="flex w-full text-xs my-8">
        <Link
          className={`border-b p-2 flex-1 flex justify-center items-center hover:border-b-primary transition-all ${
            pathname.endsWith("guess") ? "border-b border-primary bg-primary text-background" : "border-transparent text-primary"
          }`}
          href={`/home/room/${params.roomId}/guess`}
        >
          {t("guess")}
        </Link>
        <Link
          className={`border-b p-2 flex-1 flex justify-center items-center hover:border-b-primary transition-all ${
            pathname.endsWith("ranks") ? "border-b border-primary bg-primary text-background" : "border-transparent text-primary"
          }`}
          href={`/home/room/${params.roomId}/ranks`}
        >
          {t("ranks")}
        </Link>
        <Link
          className={`border-b p-2 flex-1 flex justify-center items-center hover:border-b-primary transition-all ${
            pathname.endsWith("papers") ? "border-b border-primary bg-primary text-background" : "border-transparent text-primary"
          }`}
          href={`/home/room/${params.roomId}/papers`}
        >
          {t("guessPapers")}
        </Link>
        <Link
          className={`border-b p-2 flex-1 flex justify-center items-center hover:border-b-primary transition-all ${
            pathname.endsWith("prizes") ? "border-b border-primary bg-primary text-background" : "border-transparent text-primary"
          }`}
          href={`/home/room/${params.roomId}/prizes`}
        >
          {t("prizes")}
        </Link>
      </div>
      {children}
    </div>
  );
};

export default RoomLayout;
