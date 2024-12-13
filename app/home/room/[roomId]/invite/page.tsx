import RoomInviteContent from "@/components/room/pages/invite/RoomInviteContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guessers | Room | Invite",
  description: "Invite your friends to your room",
};

interface IRoomInviteProps {
  params: { roomId: string };
}

const RoomInvite = ({ params }: IRoomInviteProps) => {
  return <RoomInviteContent params={params} />;
};

export default RoomInvite;
