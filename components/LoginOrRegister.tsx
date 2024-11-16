import { useState } from "react";
import PrimaryButton from "./common/button/PrimaryButton";
import { signIn } from "next-auth/react";
import { Form, Formik } from "formik";
import Loader from "./common/Loader";
import { createUser } from "@/api/authentication";
import CustomInputField from "./form/CustomInputField";
import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username too Short!")
    .max(30, "Username too Long!")
    .required("Username is Required."),
  password: Yup.string()
    .min(6, "Password too Short!")
    .max(50, "Password too Long!")
    .required("Password is Required."),
});

const LoginOrRegister = () => {
  const [loading, setLoading] = useState(false);
  const [registerFormVisible, setRegisterFormVisible] = useState(false);
  const initialValues = {
    username: "",
    password: "",
  };
  return (
    <div className="flex flex-col justify-start items-start w-full my-8">
      <p>
        Already have an account?{" "}
        <PrimaryButton
          type="button"
          text={"Login"}
          onClick={() => signIn("keycloak")}
        />
      </p>

      <p className="my-4">
        Do not have an account yet?{" "}
        <PrimaryButton
          type="button"
          text={"Register"}
          onClick={() => setRegisterFormVisible(!registerFormVisible)}
        />
      </p>

      {registerFormVisible && (
        <Formik
          initialValues={initialValues}
          validationSchema={RegisterSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values) => {
            setLoading(true);
            createUser(values).finally(() => {
              setLoading(false);
            });
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col justify-start items-start">
              <div className="flex justify-start items-center">
                <CustomInputField
                  withLabel={true}
                  name="username"
                  type="text"
                  placeholder={"username"}
                  placeholderInside={true}
                />
              </div>

              <div className="flex justify-start items-center">
                <CustomInputField
                  withLabel={true}
                  name="password"
                  type="password"
                  placeholder={"password"}
                  placeholderInside={true}
                />
              </div>

              {loading ? (
                <div className="text-xs text-primary">
                  <Loader />
                </div>
              ) : (
                <PrimaryButton type="submit" text={"Register"} bg={true} />
              )}

              {errors.username && touched.username ? (
                <div className="text-xs my-2 text-primary">{errors.username}</div>
              ) : null}
              {errors.password && touched.password ? (
                <div className="text-xs my-2 text-primary">{errors.password}</div>
              ) : null}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default LoginOrRegister;
