import HomeContent from "@/components/home/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guessers | Home",
  description: "Guessers.io, invite your friends to your room, and guess together!",
};

const Home = () => {
  return <HomeContent />;
};

export default Home;
