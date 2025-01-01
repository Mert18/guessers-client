"use client";
import { getStats } from "@/api/authentication";
import Loader from "@/components/common/Loader";
import LoginOrRegister from "@/components/auth/LoginOrRegister";
import Welcomer from "@/components/common/Welcomer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoWithText from "@/components/common/LogoWithText";
import Image from "next/image";

function Home() {
  const [theme, setTheme] = useState("light");
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    userCount: 0,
    roomCount: 0,
    eventCount: 0,
  });
  const router = useRouter();

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    } else {
      getStats().then((response) => {
        setStats(response.data.data);
      });
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center w-full">
        <LogoWithText />
        <Welcomer stats={stats} />

        <LoginOrRegister />

        <button
          onClick={toggleTheme}
          className="flex justify-center items-center absolute top-3 right-3"
        >
          {theme == "light" ? (
            <Image src={"/icons/moon.svg"} width={20} height={20} alt="moon" />
          ) : (
            <Image src="/icons/sun.svg" width={20} height={20} alt="sun" />
          )}
        </button>
      </div>
    );
  }
}

export default Home;
