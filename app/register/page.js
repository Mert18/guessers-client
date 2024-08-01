"use client";
import { createUser } from "@/api/authentication";
import Loader from "@/components/common/Loader";
import Logo from "@/components/common/Logo";
import CustomInputField from "@/components/form/CustomInputField";
import { Form, Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
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
        <Form className="flex flex-col justify-center items-center">
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

          <button
            className="flex justify-center items-center bg-primary-brighter text-background-accent hover:bg-primary rounded-sm m-2 transition-all"
            type="submit"
          >
            {loading ? <Loader /> : <p className="p-2 text-sm">{t("register")}</p>}
          </button>
        </Form>
      </Formik>
      <div className="flex justify-center items-center bg-background-darker rounded-sm m-2 transition-all hover:bg-background-accent">
        <button className="text-sm p-2" onClick={() => signIn("keycloak")}>
        {t("loginInstead")}
        </button>
      </div>
    </div>
  );
};

export default Register;
