"use client";
import Loader from "@/components/common/Loader";
import NavbarNoAuth from "@/components/common/NavbarNoAuth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    } else {
      router.push("/");
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
      <div className="flex flex-col">
        <NavbarNoAuth />
        <p className="text-text">hello ohme</p>
      </div>
    );
  }
}
