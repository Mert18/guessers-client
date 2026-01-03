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
      <div className={`${font.className} w-full min-h-screen overflow-y-auto bg-white scroll-smooth`}>
        <BackgroundSVGs />

        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-linear-primary">
          <div className="container mx-auto px-6 py-20 text-center relative z-10">
            {/* Announcements Display */}
            <div className="max-w-md mx-auto mb-8 min-h-[100px] flex flex-col justify-end">
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

            <div className="mb-8">
              <LogoWithText />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Predict. Compete. Win.
            </h1>
            <p className="text-2xl md:text-3xl text-white mb-8 max-w-3xl mx-auto opacity-90">
              Create prediction games with friends, make your guesses on future events,
              and climb the leaderboard as outcomes unfold.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="#get-started"
                className="px-10 py-4 bg-secondary text-white text-lg rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started
              </a>
              <a
                href="#how-it-works"
                className="px-10 py-4 bg-white bg-opacity-20 text-white text-lg rounded-lg font-semibold hover:bg-opacity-30 transition-all backdrop-blur-sm"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-white relative z-10">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
              How It Works
            </h2>
            <p className="text-center text-gray-600 text-lg md:text-xl mb-16 max-w-2xl mx-auto">
              Get started in four simple steps and start competing with your friends
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-linear-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  1
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-primary">Create a Room</h3>
                <p className="text-gray-600 text-lg">
                  Set up your prediction room and make it public or invite-only
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-linear-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  2
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-primary">Invite Friends</h3>
                <p className="text-gray-600 text-lg">
                  Bring your friends into the room to compete together
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-linear-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  3
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-primary">Make Predictions</h3>
                <p className="text-gray-600 text-lg">
                  Create events and submit your guesses on possible outcomes
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-linear-primary rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                  4
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-primary">Compete & Win</h3>
                <p className="text-gray-600 text-lg">
                  Track your ranking as events conclude and see who predicted best
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50 relative z-10">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
              Why Choose Guessers?
            </h2>
            <p className="text-center text-gray-600 text-lg md:text-xl mb-16 max-w-2xl mx-auto">
              Everything you need to create engaging prediction competitions
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-semibold mb-3 text-primary">Custom Events</h3>
                <p className="text-gray-600 text-lg">
                  Create unlimited prediction events with multiple outcome options for any topic
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-5xl mb-4">👥</div>
                <h3 className="text-2xl font-semibold mb-3 text-primary">Social Competition</h3>
                <p className="text-gray-600 text-lg">
                  Invite friends, track rankings, and see who has the best prediction skills
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-2xl font-semibold mb-3 text-primary">Live Rankings</h3>
                <p className="text-gray-600 text-lg">
                  Real-time leaderboards update as events are finalized and winners emerge
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-2xl font-semibold mb-3 text-primary">Private Rooms</h3>
                <p className="text-gray-600 text-lg">
                  Keep your predictions private with invite-only rooms or go public
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-5xl mb-4">📜</div>
                <h3 className="text-2xl font-semibold mb-3 text-primary">Guess Papers</h3>
                <p className="text-gray-600 text-lg">
                  Track your prediction history and see your wins, losses, and accuracy over time
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-5xl mb-4">⚡</div>
                <h3 className="text-2xl font-semibold mb-3 text-primary">Real-time Updates</h3>
                <p className="text-gray-600 text-lg">
                  Get instant notifications about new events, finalizations, and room activities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section id="get-started" className="py-20 bg-white relative z-10">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-primary">
              Ready to Start Guessing?
            </h2>
            <p className="text-center text-gray-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Create your account or sign in to join the competition
            </p>

            <div className="max-w-12xl mx-auto">
              <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
                <div className="grid lg:grid-cols-5">
                  <div className="lg:col-span-2 p-12 bg-linear-primary flex items-center justify-center">
                    <div className="text-center">
                      <div className="mb-6">
                        <LogoWithText />
                      </div>
                      <h3 className="text-white text-2xl font-bold mb-4">
                        Join the Prediction Revolution
                      </h3>
                      <div className="space-y-3 text-white text-left max-w-sm mx-auto">
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-lg">Create unlimited prediction rooms</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-lg">Compete with friends on leaderboards</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-lg">Track your prediction accuracy</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-lg">100% free to use</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-3 p-8 lg:p-12 bg-gray-50">
                    <LoginOrRegister />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

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
    );
  }
}

export default Home;
