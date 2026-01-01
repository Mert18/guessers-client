import { useState } from "react";
import CustomButton from "../common/CustomButton";
import { signIn } from "next-auth/react";
import { Form, Formik } from "formik";
import Loader from "../common/Loader";
import { createUser, banUsername, checkUsername } from "@/api/authentication";
import CustomInputField from "../common/CustomInputField";
import * as Yup from "yup";
import Image from "next/image";
import Logo from "../common/logo/Logo";
import { ColorEnum } from "@/enum/enum";
import LuckGame from "./LuckGame";

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
  const [gameActive, setGameActive] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [pendingRegistration, setPendingRegistration] = useState<{
    username: string;
    password: string;
  } | null>(null);

  const initialValues = {
    username: "",
    password: "",
  };

  const handleGameSuccess = () => {
    if (!pendingRegistration) return;

    setLoading(true);
    createUser(pendingRegistration).finally(() => {
      setPendingRegistration(null);
      setGameActive(false);
      setLoading(false);
      setIsRegisterFormVisible(false);
    });
  };

  const handleGameFailure = () => {
    if (!pendingRegistration) return;

    setLoading(true);
    banUsername(pendingRegistration.username).finally(() => {
      setPendingRegistration(null);
      setGameActive(false);
      setLoading(false);
    });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full py-8">
      <div className="flex flex-col justify-center items-center mb-8">
        <div className="mb-4">
          <Logo />
        </div>
        <h2 className="text-3xl md:text-4xl text-primary font-bold mb-2">Guessers.io</h2>
        <p className="text-gray-600 text-lg text-center max-w-sm">
          Sign in to join prediction rooms and compete with friends
        </p>
      </div>

      <div className="flex flex-col justify-center items-center w-full max-w-md px-4">
        <h3 className="text-xl font-semibold text-primary mb-4 text-center">
          Already have an account?
        </h3>
        <div className="w-full mb-6">
          <CustomButton
            type="button"
            text={"Login with Keycloak"}
            onClick={() => signIn("keycloak")}
            bg={true}
            color={ColorEnum.SECONDARY}
            icon={
              <Image
                src="/icons/keycloak.svg"
                alt="keycloak"
                width={24}
                height={24}
              />
            }
          />
        </div>

        <div className="flex items-center w-full my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <p className="mx-4 text-gray-500 font-semibold">OR</p>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <h3 className="text-xl font-semibold text-primary mb-4 text-center">
          New to Guessers?
        </h3>
        {gameActive && pendingRegistration && (
          <div className="w-full">
            <LuckGame
              username={pendingRegistration.username}
              onSuccess={handleGameSuccess}
              onFailure={handleGameFailure}
            />
          </div>
        )}
        {isRegisterFormVisible && !gameActive && (
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={async (values, { resetForm }) => {
              values.username = values.username.toLowerCase();
              setUsernameError(null);
              setLoading(true);

              try {
                const response = await checkUsername(values.username);

                // Check if username already exists
                if (response.data.exists) {
                  setUsernameError(`Username "${values.username}" already exists. Please choose a different username.`);
                  setLoading(false);
                  return;
                }

                // Check if username is banned
                if (response.data.banned) {
                  setUsernameError(`Username "${values.username}" is banned. Please choose a different username.`);
                  setLoading(false);
                  return;
                }

                // Username is available, proceed to game
                setPendingRegistration(values);
                setGameActive(true);
                setLoading(false);
              } catch (error) {
                setLoading(false);
              }
            }}
          >
            {({ errors, touched }) => (
              <Form
                className="flex flex-col justify-start items-start w-full my-2"
                autoComplete="off"
              >
                <div className="w-full mb-4">
                  <CustomInputField
                    withLabel={true}
                    name="username"
                    type="text"
                    placeholder={"Choose a username"}
                  />
                </div>

                <div className="w-full mb-4">
                  <CustomInputField
                    withLabel={true}
                    name="password"
                    type="password"
                    placeholder={"Create a password"}
                  />
                </div>

                <div className="w-full">
                  <CustomButton type="submit" text={"Create Account"} bg={true} />
                </div>

                <div className="w-full">
                  {usernameError && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-failure text-sm">
                      {usernameError}
                    </div>
                  )}
                  {errors.username && touched.username ? (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-failure text-sm">
                      {errors.username}
                    </div>
                  ) : null}
                  {errors.password && touched.password ? (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded text-failure text-sm">
                      {errors.password}
                    </div>
                  ) : null}
                </div>
              </Form>
            )}
          </Formik>
        )}
        {!gameActive && (
          <div className="flex flex-col w-full text-center">
            {loading ? (
              <div className="text-primary">
                <Loader />
              </div>
            ) : (
              !isRegisterFormVisible && (
                <>
                  <div className="w-full mb-3">
                    <CustomButton
                      type="button"
                      text={"Create New Account"}
                      bg={true}
                      onClick={() => setIsRegisterFormVisible(true)}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    Join for free and start making predictions
                  </p>
                </>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginOrRegister;
