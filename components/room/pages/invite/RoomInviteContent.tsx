"use client";
import { getRoom, invitePeople } from "@/api/room";
import CustomButton from "@/components/common/CustomButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import Loader from "@/components/common/Loader";
import CustomInputField from "@/components/common/CustomInputField";
import { IRoomBasic } from "@/types/IRoom.model";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RoomName from "../../layout/RoomName";
import { useRouter } from "next/navigation";

interface IRoomInviteContentProps {
  params: { roomId: string };
}

const RoomInviteContent = ({ params }: IRoomInviteContentProps) => {
  const [room, setRoom] = useState<IRoomBasic>();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
  };
  const router = useRouter();

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
        onSubmit={(values, { resetForm }) => {
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
          })
            .then(() => {
              router.push(`/home/room/${params.roomId}/guess`);
            })
            .finally(() => {
              setLoading(false);
              resetForm();
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
              <CustomButton type="submit" text={"Invite"} bg={true} />
            )}
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RoomInviteContent;
