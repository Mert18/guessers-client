import { useState } from "react";
import PrimaryButton from "../common/button/PrimaryButton";
import { signIn } from "next-auth/react";
import { Form, Formik } from "formik";
import Loader from "../common/Loader";
import { createUser } from "@/api/authentication";
import CustomInputField from "../common/CustomInputField";
import * as Yup from "yup";

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
  const initialValues = {
    username: "",
    password: "",
  };
  return (
    <div className="flex flex-col justify-center items-center my-8 md:w-1/3 w-full p-2 font-bold">
      <p className="flex flex-col w-full text-center">
        <span className="my-2 text-primary-one font-normal">Already have an account?</span>
        <PrimaryButton
          type="button"
          text={"Login"}
          onClick={() => signIn("keycloak")}
        />
      </p>

      <div className="w-full h-0.5 my-4"></div>

      <p className="my-2 text-primary-two font-normal">Do not have an account yet? </p>

      <p className="text-start w-full font-bold text-primary-two">Register</p>
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
          <Form className="flex flex-col justify-start items-start w-full">
            <CustomInputField
              withLabel={true}
              name="username"
              type="text"
              placeholder={"username"}
              placeholderInside={true}
              one={false}
            />

            <CustomInputField
              withLabel={true}
              name="password"
              type="password"
              placeholder={"password"}
              placeholderInside={true}
              one={false}
            />

            <div className="flex flex-col w-full text-center">
              {loading ? (
                <div className="text-xs text-primary">
                  <Loader />
                </div>
              ) : (
                <PrimaryButton type="submit" text={"Register"} one={false} />
              )}
            </div>
            <div className="w-full">
              {errors.username && touched.username ? (
                <div className="text-xs my-2 text-failure">
                  {errors.username}
                </div>
              ) : null}
              {errors.password && touched.password ? (
                <div className="text-xs my-2 text-failure">
                  {errors.password}
                </div>
              ) : null}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginOrRegister;
