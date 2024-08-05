"use client";
import { createRoom } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import CustomInputField from "@/components/form/CustomInputField";
import {  Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CreateRoom = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    name: "",
    publico: false
  };

  const publicOptions = [
    { value: true, label: t("yes") },
    { value: false, label: t("no") }
  ];

  return (
    <div className="flex flex-col justify-center items-center w-1/3">
      <ComponentTitle text={t("createRoom")} />
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          createRoom(values).then((response) => {
            setTimeout(() => {
              window.location.href = "/home/room/" + response.data.id;
            }, 2000);
          });
        }}
      >
          <Form className="flex flex-col justify-center items-center w-full">
            <CustomInputField
              name="name"
              type="text"
              placeholder={t("roomName")}
              withLabel={true}
            />

            <CustomInputField
              name="publico"
              type="select"
              placeholder={t("public")}
              withLabel={true}
              options={publicOptions}
            />

            <PrimaryButton type="submit" text={t("createRoom")} />
          </Form>
      </Formik>
    </div>
  );
};

export default CreateRoom;
