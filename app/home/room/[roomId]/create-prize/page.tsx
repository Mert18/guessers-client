"use client";
import { createPrize } from "@/api/prize";
import { getRoom } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import Logo from "@/components/common/Logo";
import CustomInputField from "@/components/form/CustomInputField";
import RoomName from "@/components/room/RoomName";
import { IRoomBasic } from "@/types/IRoom.model";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ICreatePrizeProps {
  params: {
    roomId: string;
  };
}

const CreatePrize = ({ params }: ICreatePrizeProps) => {
  const [room, setRoom] = useState<IRoomBasic>();
  const router = useRouter();

  const initialValues = {
    name: "",
    description: "",
    value: 0,
  };

  useEffect(() => {
    getRoom(params.roomId).then((response) => {
      setRoom(response.data);
    });
  }, [params.roomId]);

  return (
    room && (
      <div className="flex flex-col justify-center items-center">
        <ComponentTitle text={"Create Prize"} />

        <RoomName roomName={room.name} />

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            createPrize(values, params.roomId).then(() => {
              // TODO: what is it
              setTimeout(() => {
                router.push(`/home/room/${params.roomId}`);
              }, 2000);
            });
          }}
        >
          <Form className="flex flex-col justify-center items-center">
            <CustomInputField
              name={`name`}
              type="text"
              placeholder={"name"}
              withLabel={true}
            />

            <CustomInputField
              name={`description`}
              type="text"
              placeholder={"description"}
              withLabel={true}
            />

            <CustomInputField
              name={`value`}
              type="number"
              placeholder={"value"}
              withLabel={true}
            />

            <PrimaryButton type="submit" text={"Create Prize"} bg />
          </Form>
        </Formik>
      </div>
    )
  );
};

export default CreatePrize;
