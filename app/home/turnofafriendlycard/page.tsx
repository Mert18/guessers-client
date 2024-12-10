import { Lobster } from "next/font/google";
import React from "react";
const font = Lobster({ subsets: ["latin"], weight: ["400"] });

const TurnOfAFriendlyCard = () => {
  return (
    <div
      className={` ${font.className} flex flex-col justify-center items-center h-[60vh]`}
    >
      <div>
        <h1 className="text-3xl font-bold text-primary-default text-center my-4">
          The game never ends when your whole world depends on the turn of a
          friendly card.
        </h1>
      </div>
      <iframe
        title="Turn of a Friendly Card"
        className="rounded-none"
        src="https://open.spotify.com/embed/track/2viraKhy1hIBDCWYA8jtPs?utm_source=generator&theme=0"
        width="100%"
        height="152"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default TurnOfAFriendlyCard;
