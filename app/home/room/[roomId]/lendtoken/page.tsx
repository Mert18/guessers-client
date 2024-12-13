import RoomLendTokenContent from "@/components/room/pages/lendtoken/RoomLendTokenContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guessers | Room | Lend Token",
  description: "Lend token to your room members",
};

interface IRoomLendTokenProps {
  params: {
    roomId: string;
  };
}

const RoomLendToken = ({ params }: IRoomLendTokenProps) => {
  return <RoomLendTokenContent params={params} />;
};

export default RoomLendToken;
