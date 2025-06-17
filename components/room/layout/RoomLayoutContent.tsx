"use client";
import { getRoomUser } from "@/api/room";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RoomHeader from "./RoomHeader";
import CustomLink from "@/components/common/CustomLink";
import path from "path";

interface IRoomLayoutContentProps {
  params: {
    roomId: string;
  };
  children: React.ReactNode;
}

const RoomLayoutContent = ({ params, children }: IRoomLayoutContentProps) => {
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
    <div className="w-full mx-auto">
      {!pathname.endsWith("create") &&
        !pathname.endsWith("invite") &&
        !pathname.endsWith("finalize") && (
          <>
            <RoomHeader roomUser={roomUser} />

            <div className="flex w-full gap-1 mt-4">
              <CustomLink
                text="Guess"
                href={`/home/room/${params.roomId}/guess`}
                bg={pathname.endsWith("guess")}
              />

              <CustomLink
                text="Ranks"
                href={`/home/room/${params.roomId}/ranks`}
                bg={pathname.endsWith("ranks")}
              />

              <CustomLink
                text="Guess Papers"
                href={`/home/room/${params.roomId}/papers`}
                bg={pathname.endsWith("papers")}
              />
            </div>
          </>
        )}

      {children}
    </div>
  );
};

export default RoomLayoutContent;
