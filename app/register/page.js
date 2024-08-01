"use client";
import { createUser } from "@/api/authentication";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import Loader from "@/components/common/Loader";
import Logo from "@/components/common/Logo";
import CustomInputField from "@/components/form/CustomInputField";
import LoginInstead from "@/components/register/LoginInstead";
import { Form, Formik } from "formik";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };
  const { t } = useTranslation();

  const router = useRouter();

  if (status === "loading") {
    return (
      <div>
        <Loader />
      </div>
    );
  } else if (session) {
    router.push("/home");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <Logo />
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setLoading(true);
          createUser(values);
        }}
      >
        <Form className="flex flex-col justify-center items-center my-8">
          <CustomInputField
            name={`username`}
            type="text"
            placeholder={t("username")}
            withLabel={true}
          />

          <CustomInputField
            name={`password`}
            type="password"
            placeholder={t("password")}
            withLabel={true}
          />

          <PrimaryButton type="submit" text={t("register")} />
        </Form>
      </Formik>

      <LoginInstead />
    </div>
  );
};

export default Register;
