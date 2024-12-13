"use client";
import { createRoom } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import Loader from "@/components/common/Loader";
import CustomInputField from "@/components/common/CustomInputField";
import { ISelectOption } from "@/types/IGlobal.model";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

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

  const borderlessOptions: ISelectOption[] = [
    { value: false, label: "normal" },
    { value: true, label: "borderless" },
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
        <Form className="flex flex-col justify-center items-center lg:w-2/3 w-full">
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

          <CustomInputField
            withLabel={true}
            type={"select"}
            name={"borderless"}
            placeholder={"Room Type"}
            options={borderlessOptions}
          />

          <div className="my-2"></div>
          {loading ? (
            <Loader />
          ) : (
            <PrimaryButton type="submit" text={"Create Room"} bg={true} />
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default CreateRoomContent;
