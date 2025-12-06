"use client";
import LoginOrRegister from "@/components/auth/LoginOrRegister";
import BackgroundSVGs from "@/components/common/BackgroundSVGs";
import Loader from "@/components/common/Loader";
import LogoWithText from "@/components/common/logo/LogoWithText";
import { useSession } from "next-auth/react";
import { Jersey_10 } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";

const font = Jersey_10({ subsets: ["latin"], weight: "400" });

function Home() {
  const { status } = useSession();
  const router = useRouter();
  const publicClientRef = useRef<Client | null>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);

  // Public WebSocket connection for announcements
  useEffect(() => {
    const client = new Client({
      brokerURL: `ws://localhost:8080/ws-public/websocket`,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to public websocket");

        // Subscribe to announcements
        client.subscribe('/topic/announcements', (message) => {
          const announcement = JSON.parse(message.body);
          console.log(`[${announcement.type}] ${announcement.title}: ${announcement.message}`);
          const announcementWithId = {
            ...announcement,
            id: Date.now() + Math.random(), // Unique ID for animations
          };
          setAnnouncements((prev) => {
            const updated = [...prev, announcementWithId];
            // Keep only last 3
            return updated.slice(-3);
          });
        });
      },
      onStompError: (frame) => {
        console.error("Public broker error:", frame);
      },
      onWebSocketError: (error) => {
        console.error("Public WebSocket error:", error);
      },
    });

    client.activate();
    publicClientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

  useEffect(() => {
    if (status != "loading" && status === "authenticated") {
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
        className={`${font.className} flex lg:flex-row flex-col w-full h-full text-lg`}
      >
        <div className="flex-1 bg-white my-2">
          <LoginOrRegister />
        </div>
        <div className="flex-1 bg-linear-primary bg-cover">
          <BackgroundSVGs />
          <div className="flex flex-col justify-center items-center h-full">
            {/* Announcements Display - Above Logo */}
            <div className="w-3/4 max-w-md mb-8 min-h-[120px] flex flex-col justify-end">
              {announcements.map((announcement, index) => {
                const isNewest = index === announcements.length - 1;
                return (
                  <div
                    key={announcement.id}
                    className="mb-3 last:mb-0"
                    style={{
                      animation: isNewest ? `slideUpFadeIn 0.5s ease-out forwards` : 'none',
                    }}
                  >
                    <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-secondary font-bold text-xs uppercase">
                              {announcement.type}
                            </span>
                          </div>
                          <h4 className="text-white font-semibold text-base mb-1">
                            {announcement.title}
                          </h4>
                          <p className="text-white text-sm opacity-90">
                            {announcement.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <LogoWithText />
            <p className="text-white mt-2">Join the fun and start guessing!</p>
          </div>

          <style jsx>{`
            @keyframes slideUpFadeIn {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </div>
      </div>
    );
  }
}

export default Home;
