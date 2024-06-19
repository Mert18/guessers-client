"use client";
import Loader from "@/components/common/Loader";
import Logo from "@/components/common/Logo";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/room");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-evenly items-center h-screen w-full">
      <Logo />

      <div>
        <div className="flex justify-center items-center bg-primary-brighter text-background-accent hover:bg-primary rounded-sm m-2 transition-all">
          <Link href="/register" className="text-sm p-2">
            Register
          </Link>
        </div>

        <div className="flex justify-center items-center bg-background-darker rounded-sm m-2 transition-all hover:bg-background-accent">
          <button className="text-sm p-2" onClick={() => signIn("keycloak")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
