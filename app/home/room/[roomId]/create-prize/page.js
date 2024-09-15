"use client";
import { createPrize } from "@/api/prize";
import { getRoom } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import Logo from "@/components/common/Logo";
import CustomInputField from "@/components/form/CustomInputField";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CreatePrize = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState({});
  const { t } = useTranslation();
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
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <Logo />
      </div>

      <ComponentTitle text={t("createPrize")} />

      <h1 className="text-2xl font-bold my-4 text-text">{room.name}</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
          createPrize(values, params.roomId).then(() => {
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
            placeholder={t("name")}
            withLabel={true}
          />

          <CustomInputField
            name={`description`}
            type="text"
            placeholder={t("description")}
            withLabel={true}
          />

          <CustomInputField
            name={`value`}
            type="number"
            placeholder={t("value")}
            withLabel={true}
          />

          <PrimaryButton type="submit" text={t("createPrize")} />
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePrize;
