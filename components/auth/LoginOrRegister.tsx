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
    .min(4, "Username too Short!")
    .max(30, "Username too Long!")
    .required("Username is Required."),
  password: Yup.string()
    .min(3, "Password too Short!")
    .max(50, "Password too Long!")
    .required("Password is Required."),
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
        <p>Invite your friends and start guessing.</p>
      </div>
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

        <p>or</p>
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
              <Form className="flex flex-col justify-start items-start w-full" autoComplete="off">
                <CustomInputField
                  withLabel={true}
                  name="username"
                  type="text"
                  placeholder={"username"}
                  placeholderInside={true}
                />

                <CustomInputField
                  withLabel={true}
                  name="password"
                  type="password"
                  placeholder={"password"}
                  placeholderInside={true}
                />
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
