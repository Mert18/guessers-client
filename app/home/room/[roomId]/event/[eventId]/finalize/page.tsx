import EventFinalizeContent from "@/components/room/event/pages/EventFinalizeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guessers | Room | Event Finalize",
  description: "Finalize an event for your room",
};

interface IEventFinalizeProps {
  params: {
    eventId: string;
    roomId: string;
  };
}

const EventFinalize = ({ params }: IEventFinalizeProps) => {
  return <EventFinalizeContent params={params} />;
};

export default EventFinalize;
