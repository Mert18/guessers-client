import PublicRoomsList from "@/components/home/PublicRoomsList";
import SearchRoom from "@/components/home/SearchRoom";
import SelfRoomsList from "@/components/home/SelfRoomsList";
import React from "react";

const Home = () => {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col justify-start items-start w-1/2">
        <SelfRoomsList />

        <PublicRoomsList />

        <SearchRoom />
      </div>
    </div>
  );
};

export default Home;
