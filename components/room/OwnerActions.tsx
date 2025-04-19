import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import CustomButton from "../common/CustomButton";
import { ColorEnum } from "@/enum/enum";

interface IOwnerActionsProps {
  roomId: string;
}

const OwnerActions = ({ roomId }: IOwnerActionsProps) => {
  const router = useRouter();

  return (
    <div className="flex md:flex-row flex-col items-center w-full gap-1">
      <CustomButton
        type="button"
        text="Create Event"
        onClick={() => router.push(`/home/room/${roomId}/event/create`)}
        color={ColorEnum.SECONDARY}
        bg
      />
      <CustomButton
        type="button"
        text="Invite People"
        onClick={() => router.push(`/home/room/${roomId}/invite`)}
        color={ColorEnum.SECONDARY}
        bg
      />

      <CustomButton
        type="button"
        text="Create Prize"
        onClick={() => router.push(`/home/room/${roomId}/create-prize`)}
        color={ColorEnum.SECONDARY}
        bg
      />

      <CustomButton
        type="button"
        text="Lend Token"
        onClick={() => router.push(`/home/room/${roomId}/lendtoken`)}
        color={ColorEnum.SECONDARY}
        bg
      />
    </div>
  );
};

export default OwnerActions;
