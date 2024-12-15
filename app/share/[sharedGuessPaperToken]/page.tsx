import SharedGuessPaperContent from "@/components/sharedGuessPaper/SharedGuessPaperContent";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Guessers | Shared Guess Paper",
  description: "See the shared guess paper",
};

interface ISharedGuessPaperProps {
  params: {
    sharedGuessPaperToken: string;
  };
}

const SharedGuessPaper = ({ params }: ISharedGuessPaperProps) => {
  return <SharedGuessPaperContent params={params} />;
};

export default SharedGuessPaper;
