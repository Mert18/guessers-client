import CreateRoomContent from "@/components/room/create/CreateRoomContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guessers | Create Room",
  description: "Guessers.io, create a room to invite your friends and start guessing together.",
};

const CreateRoom = () => {
  return <CreateRoomContent />  
};

export default CreateRoom;
