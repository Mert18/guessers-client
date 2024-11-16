import { useState } from "react";
import PrimaryButton from "./common/button/PrimaryButton";
import { signIn } from "next-auth/react";
import { Form, Formik } from "formik";
import Loader from "./common/Loader";
import { createUser } from "@/api/authentication";
import CustomInputField from "./form/CustomInputField";

const LoginOrRegister = () => {
  const [loading, setLoading] = useState(false);
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
          text={"login"}
          onClick={() => signIn("keycloak")}
          external={true}
        />
      </p>

        <h2 className="my-4 font-bold">or Register</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setLoading(true);
          createUser(values).finally(() => {
            setLoading(false);
          });
        }}
      >
        <Form className="flex flex-col justify-start items-start">
          <div className="flex justify-start items-center">
            <CustomInputField
              withLabel={true}
              name="username"
              type="text"
              placeholder={"username"}
            />
          </div>

          <div className="flex justify-start items-center">
            <CustomInputField
              withLabel={true}
              name="password"
              type="password"
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

export default LoginOrRegister;
