"use client";
import { createUser } from "@/api/authentication";
import { Field, Form, Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };

  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }else if (session) {
    router.push("/main");
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          createUser(values);
        }}
      >
        <Form className="flex flex-col justify-center items-center">
          <Field
            name="username"
            className="text-center text-sm px-2 py-1 text-red outline-none focus:border-b-2 border-b bg-white border-red input-field"
            type="text"
            autoComplete="off"
          />

          <Field
            name="password"
            className="text-center text-sm px-2 py-1 text-red outline-none focus:border-b-2 border-b bg-white border-red input-field"
            type="password"
            autoComplete="off"
          />

          <div className={"flex justify-center items-center"}>
            <button className="my-2 text-gray-400 px-3 py-2" type="submit">
              {loading ? (
                <Loader />
              ) : (
                <p className="text-red text-sm">Register</p>
              )}
            </button>
          </div>
        </Form>
      </Formik>
      <div className="flex justify-center items-center">
        <button className="text-sm p-2" onClick={() => signIn("keycloak")}>
          Login
        </button>
      </div>
    </>
  );
};

export default Register;
