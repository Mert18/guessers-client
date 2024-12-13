import InvitesContent from "@/components/invites/InvitesContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guessers | Invites",
  description: "Guessers.io, your pending invites",
};

const Invites = () => {
  return <InvitesContent />;
};

export default Invites;
