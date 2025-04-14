"use client";
import LoginOrRegister from "@/components/auth/LoginOrRegister";
import Loader from "@/components/common/Loader";
import LogoWithText from "@/components/common/logo/LogoWithText";
import { useSession } from "next-auth/react";
import { Jersey_10 } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const font = Jersey_10({ subsets: ["latin"], weight: "400" });

function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
        router.push("/home");
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
      <div
        className={`${font.className} flex lg:flex-row flex-col w-full h-full`}
      >
        <div className="flex-1 bg-white">
          <LoginOrRegister />
        </div>
        <div className="flex-1 bg-linear-primary bg-cover">
          <div className="flex flex-col justify-center items-center h-full">
            <LogoWithText />
            <p className="text-white mt-2">Join the fun and start guessing!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
