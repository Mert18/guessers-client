import EventCreateContent from "@/components/event/pages/EventCreateContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guessers | Room | Event Create",
  description: "Create an event in your room",
};

interface IEventCreateProps {
  params: { roomId: string };
}

const EventCreate = ({ params }: IEventCreateProps) => {
  return <EventCreateContent params={params} />;
};

export default EventCreate;
