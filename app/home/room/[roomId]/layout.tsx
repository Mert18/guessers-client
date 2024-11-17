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
      {!pathname.endsWith("create") && ( // Do not show tabs in create room page
        <>
          <RoomHeader roomUser={roomUser} />

          <div className="flex w-full text-sm my-8">
            <Link
              className={`border-b p-2 flex-1 flex justify-center items-center hover:border-b-primary transition-all ${
                pathname.endsWith("guess")
                  ? "border-b border-primary bg-primary text-background"
                  : "border-transparent text-primary"
              }`}
              href={`/home/room/${params.roomId}/guess`}
            >
              {"Guess"}
            </Link>
            <Link
              className={`border-b p-2 flex-1 flex justify-center items-center hover:border-b-primary transition-all ${
                pathname.endsWith("ranks")
                  ? "border-b border-primary bg-primary text-background"
                  : "border-transparent text-primary"
              }`}
              href={`/home/room/${params.roomId}/ranks`}
            >
              {"Ranks"}
            </Link>
            <Link
              className={`border-b p-2 flex-1 flex justify-center items-center hover:border-b-primary transition-all ${
                pathname.endsWith("papers")
                  ? "border-b border-primary bg-primary text-background"
                  : "border-transparent text-primary"
              }`}
              href={`/home/room/${params.roomId}/papers`}
            >
              {"Guess Papers"}
            </Link>
            <Link
              className={`border-b p-2 flex-1 flex justify-center items-center hover:border-b-primary transition-all ${
                pathname.endsWith("prizes")
                  ? "border-b border-primary bg-primary text-background"
                  : "border-transparent text-primary"
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
