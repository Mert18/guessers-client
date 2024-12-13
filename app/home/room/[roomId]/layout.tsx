import RoomLayoutContent from "@/components/room/layout/RoomLayoutContent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Guessers | Room",
  description: "Guessers.io, where you meet up and guess with your friends!",
};

interface IRoomLayoutProps {
  params: {
    roomId: string;
  };
  children: React.ReactNode;
}

const RoomLayout = ({ params, children }: IRoomLayoutProps) => {
  return <RoomLayoutContent params={params}>{children}</RoomLayoutContent>;
};

export default RoomLayout;
