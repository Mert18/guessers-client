import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomButton from "../common/CustomButton";
import { ColorEnum } from "@/enum/enum";
import ComponentTitle from "../common/ComponentTitle";

interface IOwnerActionsProps {
  roomId: string;
}

const OwnerActions = ({ roomId }: IOwnerActionsProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-full mt-4">
      <ComponentTitle
        text="Admin Actions"
        icon={
          <Image
            src={"/icons/roomdoor.svg"}
            width={20}
            height={20}
            alt="roomn"
          />
        }
      />
      <div className="flex items-center w-full gap-1">
        <CustomButton
          type="button"
          text="Create Event"
          onClick={() => router.push(`/home/room/${roomId}/event/create`)}
          color={ColorEnum.PRIMARY}
          bg
        />
        <CustomButton
          type="button"
          text="Invite People"
          onClick={() => router.push(`/home/room/${roomId}/invite`)}
          color={ColorEnum.PRIMARY}
          bg
        />
      </div>
    </div>
  );
};

export default OwnerActions;
