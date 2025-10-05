import { useState } from "react";
import CustomButton from "../common/CustomButton";
import { signIn } from "next-auth/react";
import { Form, Formik } from "formik";
import Loader from "../common/Loader";
import { createUser } from "@/api/authentication";
import CustomInputField from "../common/CustomInputField";
import * as Yup from "yup";
import Image from "next/image";
import Logo from "../common/logo/Logo";
import { ColorEnum } from "@/enum/enum";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .matches(
      /^[a-zA-Z0-9._-]+$/,
      "Username can only contain alphanumeric characters, dashes, underscores, and periods."
    )
    .min(4, "Username too short!")
    .max(30, "Username too long!")
    .required("Username is required."),
  password: Yup.string()
    .min(3, "Password too short!")
    .max(50, "Password too long!")
    .required("Password is required."),
});

const LoginOrRegister = () => {
  const [loading, setLoading] = useState(false);
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <div className="flex flex-col justify-evenly items-center w-full h-full">
      <div className="flex flex-col justify-center items-center w-1/2">
        <Logo />
        <p className="text-2xl text-primary font-bold">Guessers.io</p>
      </div>

      <p className="text-primary p-2 rounded-md">
        Invite your friends and start guessing.
      </p>
      <div className="flex flex-col justify-center items-center w-1/2">
        <div className="w-full">
          <CustomButton
            type="button"
            text={"Login"}
            onClick={() => signIn("keycloak")}
            bg={true}
            color={ColorEnum.SECONDARY}
            icon={
              <Image
                src="/icons/keycloak.svg"
                alt="keycloak"
                width={20}
                height={20}
              />
            }
          />
        </div>

        <p className="my-4 text-primary">or</p>
        {isRegisterFormVisible && (
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, { resetForm }) => {
              setLoading(true);
              values.username = values.username.toLowerCase();
              createUser(values).finally(() => {
                resetForm();
                setLoading(false);
              });
            }}
          >
            {({ errors, touched }) => (
              <Form
                className="flex flex-col justify-start items-start w-full my-2"
                autoComplete="off"
              >
                <CustomInputField
                  withLabel={true}
                  name="username"
                  type="text"
                  placeholder={"username"}
                />

                <CustomInputField
                  withLabel={true}
                  name="password"
                  type="password"
                  placeholder={"password"}
                />

                <div className="my-1"></div>
                <CustomButton type="submit" text={"Register"} bg={true} />

                <div className="w-full">
                  {errors.username && touched.username ? (
                    <div className="my-2 text-failure">{errors.username}</div>
                  ) : null}
                  {errors.password && touched.password ? (
                    <div className="my-2 text-failure">{errors.password}</div>
                  ) : null}
                </div>
              </Form>
            )}
          </Formik>
        )}
        <div className="flex flex-col w-full text-center">
          {loading ? (
            <div className="text-primary">
              <Loader />
            </div>
          ) : (
            !isRegisterFormVisible && (
              <CustomButton
                type="button"
                text={"Register"}
                bg={true}
                onClick={() => setIsRegisterFormVisible(true)}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginOrRegister;
