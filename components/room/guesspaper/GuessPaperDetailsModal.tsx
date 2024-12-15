"use client";
import { IGuessPaper } from "@/types/IGuessPaper.model";
import GuessPaperGuess from "./GuessPaperGuess";
import GuessPaperMetadata from "./GuessPaperMetadata";
import { useState } from "react";
import Loader from "@/components/common/Loader";
import { shareGuessPaper } from "@/api/sharedguesspaper";
import Link from "next/link";

interface IGuessPaperDetailsModalProps {
  guessPaper: IGuessPaper;
  isShare?: boolean;
}

const GuessPaperDetailsModal = ({
  guessPaper,
  isShare,
}: IGuessPaperDetailsModalProps) => {
  const [loading, setLoading] = useState(false);
  const [sharedToken, setSharedToken] = useState("");
  const [isSharedPopUpVisible, setIsSharedPopUpVisible] = useState(false);
  const [isSharedLinkCopied, setIsSharedLinkCopied] = useState(false);

  return (
    guessPaper && (
      <>
        <div className="w-full text-xs">
          <div className="bg-primary-default p-2 flex justify-start items-center text-background-bright font-bold border-2 border-primary-default">
            <h2 className="flex-1">{"Event"}</h2>
            <h2 className="flex-1">{"Guess Option"}</h2>
            <h2 className="flex-1">{"Guess"}</h2>
            <h2 className="flex-1">{"Odds"}</h2>
            <h2 className="flex-1">{"Status"}</h2>
          </div>
          {guessPaper?.guesses?.map((guess) => (
            <GuessPaperGuess
              key={
                guess.event.id +
                guess.eventGuessOption.id +
                guess.eventGuessOptionCase.id
              }
              guess={guess}
            />
          ))}
        </div>
        <GuessPaperMetadata guessPaper={guessPaper} />

        {loading ? (
          <Loader />
        ) : (
          !isShare && (
            <button
              className="text-text-default hover:text-primary-default my-2"
              onClick={() => {
                setLoading(true);
                shareGuessPaper(guessPaper.id)
                  .then((response) => {
                    setSharedToken(response?.data);
                    setIsSharedPopUpVisible(true);
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              Share
            </button>
          )
        )}

        {isSharedPopUpVisible && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background-bright text-text-default p-4 border-2 border-text-default flex flex-col justify-center items-center">
            <p>Share this link with your friends:</p>
            {sharedToken ? (
              <div className="flex flex-col justify-center items-center">
                <Link
                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URI}/share/${sharedToken}`}
                  className="p-2"
                >{`${process.env.NEXT_PUBLIC_FRONTEND_URI}/share/${sharedToken}`}</Link>

                {isSharedLinkCopied ? (
                  <p>Copied!</p>
                ) : (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${process.env.NEXT_PUBLIC_FRONTEND_URI}/share/${sharedToken}`
                      );
                      setIsSharedLinkCopied(true);
                      setTimeout(() => {
                        setIsSharedLinkCopied(false);
                      }, 2000);
                    }}
                  >
                    Copy The Link
                  </button>
                )}
              </div>
            ) : (
              <p>The Guess Paper could not be shared.</p>
            )}
          </div>
        )}
      </>
    )
  );
};

export default GuessPaperDetailsModal;
