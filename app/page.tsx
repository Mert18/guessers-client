"use client";
import { getStats } from "@/api/authentication";
import Loader from "@/components/common/Loader";
import LoginOrRegister from "@/components/LoginOrRegister";
import Welcomer from "@/components/Welcomer";
import { useSession } from "next-auth/react";
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
      <div className="flex flex-col text-text justify-center items-center">
        <div className="flex flex-col items-center justify-center py-8 w-1/3">
          <Welcomer stats={stats} />

          <LoginOrRegister />
        </div>
      </div>
    );
  }
}

export default Home;