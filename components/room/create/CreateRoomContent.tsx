"use client";
import { createRoom } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
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
    publico: false
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

          {loading ? (
            <Loader />
          ) : (
            <PrimaryButton type="submit" text={"Create Room"} />
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default CreateRoomContent;
