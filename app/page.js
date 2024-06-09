"use client"
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
    return <div>Loading...</div>;
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* LOGO */}
      <div className="flex justify-center items-center">
        <Link href="/register" className="text-sm p-2">
          Register
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <button className="text-sm p-2" onClick={() => signIn("keycloak")}>
          Login
        </button>
      </div>
    </div>
  );
}
