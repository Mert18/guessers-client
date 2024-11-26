"use client";
import React, { useEffect, useState } from "react";
import { getRoomUser } from "@/api/room";
import RoomHeader from "@/components/room/RoomHeader";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IRoomLayoutProps {
  params: {
    roomId: string;
  };
  children: React.ReactNode;
}

const RoomLayout = ({ params, children }: IRoomLayoutProps) => {
  const [roomUser, setRoomUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchRoomUser = async () => {
      const userResponse = await getRoomUser(params.roomId);
      setRoomUser(userResponse.data);
    };

    fetchRoomUser();
  }, [params.roomId]);

  if (!roomUser) return;
  return (
    <div>
      {!pathname.endsWith("create") && !pathname.endsWith("invite") && !pathname.endsWith("create-prize") && !pathname.endsWith("lendtoken") && ( // Do not show tabs in create room page
        <>
          <RoomHeader roomUser={roomUser} />

          <div className="flex w-full text-sm gap-1">
            <Link
              className={`border-2 rounded-md p-2 text-xs flex-1 flex justify-center items-center hover:border-b-primary transition-all font-bold ${
                pathname.endsWith("guess")
                  ? "border-primary-default bg-primary-default text-background-bright hover:bg-primary-bright"
                  : "border-primary-default text-text-default bg-background-bright hover:bg-primary-default hover:text-background-bright"
              }`}
              href={`/home/room/${params.roomId}/guess`}
            >
              {"Guess"}
            </Link>
            <Link
              className={`border-2 rounded-md p-2 text-xs flex-1 flex justify-center items-center hover:border-b-primary transition-all font-bold ${
                pathname.endsWith("ranks")
                  ? "border-primary-default bg-primary-default text-background-bright hover:bg-primary-bright"
                  : "border-primary-default text-text-default bg-background-bright hover:bg-primary-default hover:text-background-bright"
              }`}
              href={`/home/room/${params.roomId}/ranks`}
            >
              {"Ranks"}
            </Link>
            <Link
              className={`border-2 rounded-md p-2 text-xs flex-1 flex justify-center items-center hover:border-b-primary transition-all font-bold ${
                pathname.endsWith("papers")
                  ? "border-primary-default bg-primary-default text-background-bright hover:bg-primary-bright"
                  : "border-primary-default text-text-default bg-background-bright hover:bg-primary-default hover:text-background-bright"
              }`}
              href={`/home/room/${params.roomId}/papers`}
            >
              {"Guess Papers"}
            </Link>
            <Link
              className={`border-2 rounded-md p-2 text-xs flex-1 flex justify-center items-center hover:border-b-primary transition-all font-bold ${
                pathname.endsWith("prizes")
                  ? "border-primary-default bg-primary-default text-background-bright hover:bg-primary-bright"
                  : "border-primary-default text-text-default bg-background-bright hover:bg-primary-default hover:text-background-bright"
              }`}
              href={`/home/room/${params.roomId}/prizes`}
            >
              {"Prizes"}
            </Link>
          </div>
        </>
      )}

      {children}
    </div>
  );
};

export default RoomLayout;
