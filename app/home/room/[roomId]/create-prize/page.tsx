"use client";
import { createPrize } from "@/api/prize";
import { getRoom } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import ComponentWithHeader from "@/components/common/ComponentWithHeader";
import Loader from "@/components/common/Loader";
import Logo from "@/components/common/Logo";
import CustomInputField from "@/components/form/CustomInputField";
import RoomName from "@/components/room/RoomName";
import { IRoomBasic } from "@/types/IRoom.model";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ICreatePrizeProps {
  params: {
    roomId: string;
  };
}

const CreatePrize = ({ params }: ICreatePrizeProps) => {
  const [room, setRoom] = useState<IRoomBasic>();
  const [amount, setAmount] = useState(100);
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
            if(values.name === "" || values.description === "") {
              toast.error("Please fill all fields");
              return;
            }
            setLoading(true);
            values.value = amount;
            createPrize({
              createPrizeRequest: values,
              roomId: params.roomId,
            }).then(() => {
              setTimeout(() => {
                router.push(`/home/room/${params.roomId}/guess`);
              }, 1000);
            }).finally(() => {
              setLoading(false);
            })
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

            <ComponentWithHeader name="Amount">
              <p>
                <span className="font-bold">{amount}</span>{" "}
                <button type="button" onClick={() => setAmount(amount + 50)}>
                  +
                </button>{" "}
                <button
                  type="button"
                  onClick={() => {
                    if (amount > 100) {
                      setAmount(amount - 50);
                    }
                  }}
                >
                  -
                </button>
              </p>
            </ComponentWithHeader>
            <div className="my-2">
            {loading ? <Loader /> :  <PrimaryButton type="submit" text={"Create Prize"} bg />}
            </div>
          </Form>
        </Formik>
      </div>
    )
  );
};

export default CreatePrize;
