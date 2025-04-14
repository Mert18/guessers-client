"use client";
import { createPrize } from "@/api/prize";
import { getRoom } from "@/api/room";
import CustomButton from "@/components/common/CustomButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import Loader from "@/components/common/Loader";
import CustomInputField from "@/components/common/CustomInputField";
import { IRoomBasic } from "@/types/IRoom.model";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RoomName from "../../layout/RoomName";

interface IRoomCreatePrizeContentProps {
  params: {
    roomId: string;
  };
}

const RoomCreatePrizeContent = ({ params }: IRoomCreatePrizeContentProps) => {
  const [room, setRoom] = useState<IRoomBasic>();
  const [loading, setLoading] = useState(false);
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

        <RoomName roomName={room.name} roomId={room.id} />

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            if (values.name === "" || values.description === "") {
              toast.error("Please fill all fields");
              return;
            }
            setLoading(true);
            createPrize({
              createPrizeRequest: values,
              roomId: params.roomId,
            })
              .then(() => {
                setTimeout(() => {
                  router.push(`/home/room/${params.roomId}/guess`);
                }, 1000);
              })
              .finally(() => {
                setLoading(false);
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
              type="select"
              placeholder={"value"}
              withLabel={true}
              options={[
                { value: 100, label: "100" },
                { value: 200, label: "200" },
                { value: 500, label: "500" },
                { value: 1000, label: "1000" },
                { value: 2000, label: "2000" },
                { value: 5000, label: "5000" },
                { value: 10000, label: "10000" },
              ]}
            />

            <div className="my-2">
              {loading ? (
                <Loader />
              ) : (
                <CustomButton type="submit" text={"Create Prize"} bg />
              )}
            </div>
          </Form>
        </Formik>
      </div>
    )
  );
};

export default RoomCreatePrizeContent;
