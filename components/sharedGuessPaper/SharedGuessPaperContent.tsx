"use client";
import { getSharedGuessPaper } from "@/api/sharedguesspaper";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import React, { useEffect, useState } from "react";
import GuessPaperDetailsModal from "../room/guesspaper/GuessPaperDetailsModal";
import Loader from "../common/Loader";
import LogoWithText from "../common/LogoWithText";
import Link from "next/link";

interface ISharedGuessPaperContentProps {
  params: {
    sharedGuessPaperToken: string;
  };
}

const SharedGuessPaperContent = ({ params }: ISharedGuessPaperContentProps) => {
  const [loading, setLoading] = useState(false);
  const [guessPaper, setGuessPaper] = useState<IGuessPaper>(null);

  useEffect(() => {
    if (!params.sharedGuessPaperToken) return;
    setLoading(true);
    getSharedGuessPaper(params.sharedGuessPaperToken)
      .then((response) => {
        setGuessPaper(response?.data?.data?.guessPaper);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [params.sharedGuessPaperToken]);
  return guessPaper && loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col justify-center items-center min-h-[50vh]">
      <LogoWithText />
      <GuessPaperDetailsModal guessPaper={guessPaper} isShare={true} />
      <Link href="/home">
        <p className="text-primary-default hover:text-primary-dark">
          Back to home
        </p>
      </Link>
    </div>
  );
};

export default SharedGuessPaperContent;
