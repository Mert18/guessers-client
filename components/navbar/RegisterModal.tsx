"use client";
import { createUser } from "@/api/authentication";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import PrimaryButton from "../common/button/PrimaryButton";
import Image from "next/image";
import Loader from "../common/Loader";

interface IRegisterModalProps {
  setRegisterModalOpen: (value: boolean) => void;
}

const RegisterModal = ({ setRegisterModalOpen }: IRegisterModalProps) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };
  return (
    <div className="absolute top-full right-4 w-48">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setLoading(true);
          createUser(values).finally(() => {
            setRegisterModalOpen(false);
            setLoading(false);
          });
        }}
      >
        <Form className="flex flex-col justify-center items-center">
          <div className="flex justify-start items-center">
            <div className="bg-background p-2">
              <Image src="/user.svg" alt="user" width={15} height={15} />
            </div>
            <Field
              name="username"
              type="text"
              className="w-full text-sm px-2 py-1 text-text outline-none bg-background3 h-8 focus:ring-1 focus:ring-primary"
              autoComplete="off"
              placeholder={"username"}
            />
          </div>

          <div className="flex justify-start items-center">
            <div className="bg-background p-2">
              <Image src="/key.svg" alt="key" width={15} height={15} />
            </div>
            <Field
              name="password"
              type="password"
              className="w-full text-sm px-2 py-1 text-text outline-none bg-background3 h-8 focus:ring-1 focus:ring-primary"
              autoComplete="off"
              placeholder={"password"}
            />
          </div>

          {loading ? (
            <div className="text-xs text-primary">
              <Loader />
            </div>
          ) : (
            <PrimaryButton type="submit" text={"register"} />
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default RegisterModal;
