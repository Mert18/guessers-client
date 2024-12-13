import RoomPapersContent from "@/components/room/pages/RoomPapersContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guessers | Room | Guess Papers",
  description: "See the room members' guess papers",
};

interface IRoomPapersProps {
  params: {
    roomId: string;
  };
}

const RoomPapers = ({ params }: IRoomPapersProps) => {
  return <RoomPapersContent params={params} />;
};

export default RoomPapers;
