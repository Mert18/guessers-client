"use client";
import { getRoom, invitePeople } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ComponentTitle from "@/components/common/ComponentTitle";
import Logo from "@/components/common/Logo";
import CustomInputField from "@/components/form/CustomInputField";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const InvitePeople = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState({});
  const initialValues = {
    username: "",
  };

  const { t } = useTranslation();

  useEffect(() => {
    getRoom(params.roomId).then((response) => {
      setRoom(response.data);
    });
  }, [params.roomId])
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <Logo />
      </div>

      <ComponentTitle text={t("invitePeopleToRoom")} />

      <h1 className="text-2xl font-bold my-4 text-text">{room.name}</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          invitePeople(values.username, params.roomId);
        }}
      >
        <Form className="flex flex-col justify-center items-center">
          <CustomInputField
            name={`username`}
            type="text"
            placeholder={t("username")}
            withLabel={true}
          />

          <PrimaryButton type="submit" text={t("invite")} />
        </Form>
      </Formik>
    </div>
  );
};

export default InvitePeople;
