import RoomCreatePrizeContent from "@/components/room/pages/RoomCreatePrizeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guessers | Room | Create Prize",
  description: "Create prizes to be bought",
};

interface IRoomCreatePrizeProps {
  params: {
    roomId: string;
  };
}

const RoomCreatePrize = ({ params }: IRoomCreatePrizeProps) => {
  return <RoomCreatePrizeContent params={params} />;
};

export default RoomCreatePrize;
