import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface IOwnerActionsProps {
  roomId: string;
}

const OwnerActions = ({ roomId }: IOwnerActionsProps) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const router = useRouter();
  
  return (
    <div className="relative w-max">
      <button
        onClick={() => {
          setIsOptionsVisible(!isOptionsVisible);
        }}
        className={`p-1 transition-all flex items-center justify-start`}
      >
        <p className="text-sm p-2 text-primary-default">Owner Actions</p>
        <Image
          src="/arrow.svg"
          alt="arrow facing downward"
          width={10}
          height={10}
          className={`transition-all ${isOptionsVisible ? "rotate-180" : "hover:rotate-45"}`}
        />
      </button>

      {isOptionsVisible && (
        <div className="flex flex-col justify-start items-start absolute top-full left-0 w-full">
          <button
            onClick={() => router.push(`/home/room/${roomId}/event/create`)}
            className="text-sm p-2 text-background-bright bg-primary-default hover:bg-primary-bright transition-all w-full"
          >
            Create Event
          </button>
          <button
            onClick={() => router.push(`/home/room/${roomId}/invite`)}
            className="text-sm p-2 text-background-bright bg-primary-default hover:bg-primary-bright transition-all w-full"
          >
            Invite People
          </button>
          <button
            onClick={() => router.push(`/home/room/${roomId}/create-prize`)}
            className="text-sm p-2 text-background-bright bg-primary-default hover:bg-primary-bright transition-all w-full"
          >
            Create Prize
          </button>
        </div>
      )}
    </div>
  );
};

export default OwnerActions;
