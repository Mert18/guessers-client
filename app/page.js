import Midwife from "@/components/public/Midwife";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="flex justify-center items-center">
        <Link href="/main" className="text-sm p-2">I was already born</Link>
      </div>
    <div className="flex justify-center items-center h-full">
      <Midwife />
    </div>
    </div>
  );
}
