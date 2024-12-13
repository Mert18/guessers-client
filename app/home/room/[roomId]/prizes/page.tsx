import RoomPrizesContent from "@/components/room/pages/RoomPrizesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guessers | Room | Prizes",
  description: "Buy a prize with your guessers token",
};

interface IRoomPrizesProps {
  params: {
    roomId: string;
  };
}

const RoomPrizes = ({ params }: IRoomPrizesProps) => {
  return <RoomPrizesContent params={params} />;
};

export default RoomPrizes;
