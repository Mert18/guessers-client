"use client";
import { createRoom } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import Loader from "@/components/common/Loader";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CreateRoom = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    name: "",
    publico: false,
  };

  const publicOptions = [
    { value: true, label: t("public") },
    { value: false, label: t("private") },
  ];

  return (
    <div className="flex flex-col justify-center items-center text-xs">
      <ComponentTitle text={t("createRoom")} />
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
          <Field
            name="name"
            type="text"
            className="w-full text-sm px-2 py-1 my-2 text-text outline-none bg-background border-b border-primary h-8 focus:ring-1 focus:ring-primary"
            autoComplete="off"
            placeholder={t("roomName")}
          />

          <Field
            as="select"
            className={`w-full text-sm px-2 py-1 my-2 text-text outline-none bg-background border-b border-primary my-1 h-8 rounded-sm focus:ring-2 focus:ring-primary`}
            name={"publico"}
          >
            {publicOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field>
          {loading ? (
            <Loader />
          ) : (
            <PrimaryButton type="submit" text={t("createRoom")} />
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default CreateRoom;
