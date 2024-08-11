import PublicRoomsList from "@/components/home/PublicRoomsList";
import SelfGuessPapersList from "@/components/home/SelfGuessPapersList";
import SelfRoomsList from "@/components/home/SelfRoomsList";
import React from "react";

const Home = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-1/2">
        <SelfRoomsList />

        <PublicRoomsList />

        <SelfGuessPapersList />
      </div>
    </div>
  );
};

export default Home;
