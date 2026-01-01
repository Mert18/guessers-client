"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface WelcomeBannerProps {
  onDismiss: () => void;
}

const WelcomeBanner = ({ onDismiss }: WelcomeBannerProps) => {
  const router = useRouter();
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("welcomeBannerDismissed", "true");
    onDismiss();
  };

  const handleCreateRoom = () => {
    router.push("/home/room/create");
  };

  if (dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg shadow-lg p-6 mb-6 relative overflow-hidden">
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 text-white hover:opacity-80 transition-opacity"
        aria-label="Dismiss"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="text-white">
        <h2 className="text-2xl font-bold mb-3">Welcome to Guessers!</h2>
        <p className="mb-4 opacity-90">
          Get started with your first prediction room in just a few steps:
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center font-bold mr-3">
                1
              </div>
              <h3 className="font-semibold">Create a Room</h3>
            </div>
            <p className="text-sm opacity-90 ml-11">
              Click the "Create Room" button to set up your first prediction room
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center font-bold mr-3">
                2
              </div>
              <h3 className="font-semibold">Invite Friends</h3>
            </div>
            <p className="text-sm opacity-90 ml-11">
              Invite your friends to join the room and compete with you
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-4 border border-white border-opacity-20">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-white text-primary rounded-full flex items-center justify-center font-bold mr-3">
                3
              </div>
              <h3 className="font-semibold">Create Events</h3>
            </div>
            <p className="text-sm opacity-90 ml-11">
              Set up prediction events and let everyone make their guesses
            </p>
          </div>
        </div>

        <button
          onClick={handleCreateRoom}
          className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
        >
          Create Your First Room
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
