import RoomGuessContent from "@/components/room/pages/guess/RoomGuessContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guessers | Room | Guess",
  description: "Check latest guess papers, create a guess paper!",
};

interface IRoomGuessProps {
  params: { roomId: string };
}

const RoomGuess = ({ params }: IRoomGuessProps) => {
  return <RoomGuessContent params={params} />;
};

export default RoomGuess;
