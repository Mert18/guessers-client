"use client";
import { createUser } from "@/api/authentication";
import Loader from "@/components/common/Loader";
import Logo from "@/components/common/Logo";
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
    return (
      <div>
        <Loader />
      </div>
    );
  } else if (session) {
    router.push("/room");
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
          <Field
            placeholder="Username"
            name="username"
            className="text-center text-sm px-2 py-1 text-primary outline-none focus:border-b-2 border-b bg-background-brighter my-1 h-8 border-primary input-field"
            type="text"
            autoComplete="off"
          />

          <Field
            placeholder="Password"
            name="password"
            className="text-center text-sm px-2 py-1 text-primary outline-none focus:border-b-2 border-b bg-background-brighter my-1 h-8 border-primary input-field"
            type="password"
            autoComplete="off"
          />

          <button
            className="flex justify-center items-center bg-primary-brighter text-background-accent hover:bg-primary rounded-sm m-2 transition-all"
            type="submit"
          >
            {loading ? (
              <Loader />
            ) : (
              <p className="p-2 text-sm">Register</p>
            )}
          </button>
        </Form>
      </Formik>
      <div className="flex justify-center items-center bg-background-darker rounded-sm m-2 transition-all hover:bg-background-accent">
        <button className="text-sm p-2" onClick={() => signIn("keycloak")}>
          Login Instead
        </button>
      </div>
    </div>
  );
};

export default Register;
