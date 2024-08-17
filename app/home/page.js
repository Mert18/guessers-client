import PublicRoomsList from "@/components/home/PublicRoomsList";
import SelfGuessPapersList from "@/components/home/SelfGuessPapersList";
import SelfRoomsList from "@/components/home/SelfRoomsList";
import React from "react";

const Home = () => {
  return (
    <div className="w-full">
      <SelfRoomsList />

      <PublicRoomsList />

      <SelfGuessPapersList />
    </div>
  );
};

export default Home;
