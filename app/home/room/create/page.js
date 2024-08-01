"use client";
import { createRoom } from "@/api/room";
import CustomInputField from "@/components/form/CustomInputField";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CreateRoom = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    name: "",
  };

  const { t } = useTranslation();
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          createRoom(values).then((response) => {
            setTimeout(() => {
              window.location.href = "/room/" + response.data.id;
            }, 2000);
          });
        }}
      >
        <Form className="flex flex-col justify-center items-center">
          <CustomInputField
            name={`name`}
            type="text"
            placeholder={t("roomName")}
            withLabel={true}
          />

          <CustomInputField
            name={`description`}
            type="text"
            placeholder={t("roomDescription")}
            withLabel={true}
          />

          <div className={"flex justify-center items-center"}>
            <button className="flex justify-center items-center bg-primary-brighter text-background-accent hover:bg-primary rounded-sm m-2 transition-all" type="submit">
              {loading ? (
                <Loader />
              ) : (
                <p className="text-sm p-2">{t("roomCreate")}</p>
              )}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateRoom;
