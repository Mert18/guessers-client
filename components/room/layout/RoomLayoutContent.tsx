"use client";
import { getRoomUser } from "@/api/room";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RoomHeader from "./RoomHeader";
import CustomLink from "@/components/common/CustomLink";

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
    <div className="lg:w-2/3 w-full mx-auto">
      {!pathname.endsWith("create") &&
        !pathname.endsWith("invite") &&
        !pathname.endsWith("create-prize") &&
        !pathname.endsWith("lendtoken") &&
        !pathname.endsWith("finalize") && (
          <>
            <RoomHeader roomUser={roomUser} />

            <div className="flex w-full  gap-1">
              <CustomLink
                text="Guess"
                href={`/home/room/${params.roomId}/guess`}
                bg={true}
              />

              <CustomLink
                text="Ranks"
                href={`/home/room/${params.roomId}/ranks`}
                bg={true}
              />

              <CustomLink
                text="Guess Papers"
                href={`/home/room/${params.roomId}/papers`}
                bg={true}
              />

              <CustomLink
                text="Prizes"
                href={`/home/room/${params.roomId}/prizes`}
                bg={true}
              />
            </div>
          </>
        )}

      {children}
    </div>
  );
};

export default RoomLayoutContent;
