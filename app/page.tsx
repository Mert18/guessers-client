"use client";
import { getStats } from "@/api/authentication";
import Loader from "@/components/common/Loader";
import LoginOrRegister from "@/components/auth/LoginOrRegister";
import Welcomer from "@/components/common/Welcomer";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Home() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    userCount: 0,
    roomCount: 0,
    eventCount: 0,
  });
  const router = useRouter();

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
      <div className="flex flex-col items-center justify-start text-text lg:text-sm text-xs w-full">
        <div className="my-4"></div>
        <div className="flex justify-center items-center w-full mb-4">
          <Image
            src="/logo/logo-with-text.svg"
            alt="logo"
            width={240}
            height={240}
          />
        </div>
        <Welcomer stats={stats} />

        <LoginOrRegister />
      </div>
    );
  }
}

export default Home;
