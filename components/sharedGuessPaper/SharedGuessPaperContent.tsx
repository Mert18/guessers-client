"use client";
import { getSharedGuessPaper } from "@/api/sharedguesspaper";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import React, { useEffect, useState } from "react";
import GuessPaperDetailsModal from "../room/guesspaper/GuessPaperDetailsModal";
import Loader from "../common/Loader";
import LogoWithText from "../common/logo/LogoWithText";
import Link from "next/link";
import Logo from "../common/logo/Logo";

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
    <div className="w-full flex justify-center items-center p-4">
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
        <Logo />
        <span className="my-4"></span>
        <GuessPaperDetailsModal guessPaper={guessPaper} isShare={true} />
        <Link href="/home">
          <p className="text-primary hover:text-primary-dark">Back to home</p>
        </Link>
      </div>
    </div>
  );
};

export default SharedGuessPaperContent;
