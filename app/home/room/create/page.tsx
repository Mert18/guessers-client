"use client";
import { createRoom } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import Loader from "@/components/common/Loader";
import CustomInputField from "@/components/form/CustomInputField";
import { ISelectOption } from "@/types/IGlobal.model";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateRoom = () => {
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

  const borderlessOptions: ISelectOption[] = [
    { value: false, label: "normal" },
    { value: true, label: "borderless" },
  ];

  return (
    <div className="flex flex-col justify-center items-center text-xs">
      <ComponentTitle text={"createRoom"} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setLoading(true);
          createRoom(values)
            .then((response) => {
              router.push("/home/room/" + response.data.id);
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
            placeholder={"roomName"}
          />

          <CustomInputField
            withLabel={true}
            options={publicOptions}
            type={"select"}
            name={"publico"}
            placeholder={"publico"}
          />

          <CustomInputField
            withLabel={true}
            type={"select"}
            name={"borderless"}
            placeholder={"borderless"}
            options={borderlessOptions}
          />
          {loading ? (
            <Loader />
          ) : (
            <PrimaryButton type="submit" text={"createRoom"} />
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default CreateRoom;
