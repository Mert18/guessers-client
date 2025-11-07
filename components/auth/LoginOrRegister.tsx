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
        {gameActive && pendingRegistration && (
          <LuckGame
            username={pendingRegistration.username}
            onSuccess={handleGameSuccess}
            onFailure={handleGameFailure}
          />
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
                  {usernameError && (
                    <div className="my-2 text-failure">{usernameError}</div>
                  )}
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
        {!gameActive && (
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
        )}
      </div>
    </div>
  );
};

export default LoginOrRegister;
