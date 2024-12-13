"use client";
import { getRoom, invitePeople } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import Loader from "@/components/common/Loader";
import CustomInputField from "@/components/form/CustomInputField";
import { IRoomBasic } from "@/types/IRoom.model";
import { Formik, Form } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RoomName from "../RoomName";

interface IRoomInviteContentProps {
  params: { roomId: string };
}

const RoomInviteContent = ({ params }: IRoomInviteContentProps) => {
  const [room, setRoom] = useState<IRoomBasic>();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
  };

  useEffect(() => {
    getRoom(params.roomId).then((response) => {
      setRoom(response.data);
    });
  }, [params.roomId]);
  return (
    <div className="flex flex-col justify-center items-center my-6">
      <ComponentTitle text={"Invite People"} />
      {room?.name && <RoomName roomName={room.name} roomId={params.roomId} />}

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          if (values.username === null || values.username.length < 3) {
            toast.error(
              "Username is required and must be at least 3 characters long."
            );
            return;
          }
          setLoading(true);

          invitePeople({
            invitedUsername: values.username,
            roomId: params.roomId,
          }).finally(() => {
            setLoading(false);
          });
        }}
      >
        <Form className="flex flex-col justify-center items-center">
          <CustomInputField
            name={`username`}
            type="text"
            placeholder={"username"}
            withLabel={true}
          />

          <div className="my-2">
            {loading ? (
              <Loader />
            ) : (
              <PrimaryButton type="submit" text={"Invite"} bg />
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RoomInviteContent;
