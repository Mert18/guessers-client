"use client";
import { invitePeople } from "@/api/room";
import CustomInputField from "@/components/form/CustomInputField";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const InvitePeople = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
  };
  const { t } = useTranslation();
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          invitePeople(values, params.roomId);
        }}
      >
        <Form className="flex flex-col justify-center items-center">
        <CustomInputField
              name={`username`}
              type="text"
              placeholder={t("username")}
              withLabel={true}
            />

          <div className={"flex justify-center items-center"}>
            <button className="flex justify-center items-center bg-primary-brighter text-background-accent hover:bg-primary rounded-sm m-2 transition-all" type="submit">
              {loading ? (
                <Loader />
              ) : (
                <p className="text-sm p-2">Invite</p>
              )}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default InvitePeople;
