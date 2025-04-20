"use client";
import { createRoom } from "@/api/room";
import CustomButton from "@/components/common/CustomButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import Loader from "@/components/common/Loader";
import CustomInputField from "@/components/common/CustomInputField";
import { ISelectOption } from "@/types/IGlobal.model";
import { Formik, Form } from "formik";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const CreateRoomContent = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    name: "",
    publico: false,
    borderless: false,
  };

  const publicOptions: ISelectOption[] = [
    { value: true, label: "public" },
    { value: false, label: "private" },
  ];

  return (
    <div className="flex flex-col justify-center items-center my-6">
      <ComponentTitle text={"Create Room"} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          if (values.name === null || values.name.length < 3) {
            toast.error(
              "Room name is required and must be at least 3 characters long."
            );
            return;
          }
          setLoading(true);
          createRoom(values)
            .then(() => {
              router.push("/home");
            })
            .finally(() => {
              setLoading(false);
            });
        }}
      >
        <Form className="flex flex-col justify-center items-center w-full">
          <CustomInputField
            withLabel={true}
            name="name"
            type="text"
            placeholder={"Room Name"}
          />

          <CustomInputField
            withLabel={true}
            options={publicOptions}
            type={"select"}
            name={"publico"}
            placeholder={"Public / Private"}
          />

          <div className="my-2"></div>
          {loading ? (
            <Loader />
          ) : (
            <CustomButton type="submit" text={"Create Room"} bg={true} />
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default CreateRoomContent;
