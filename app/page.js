"use client"
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }else if (session) {
    router.push("/main");
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
