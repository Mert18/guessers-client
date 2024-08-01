"use client";
import { createEvent } from "@/api/event";
import CustomInputField from "@/components/form/CustomInputField";
import { Field, FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CreateEvent = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    name: "",
    description: "",
    options: [{ name: "", odds: "" }],
  };

  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-primary text-2xl font-bold text-center">
        {t("eventCreate")}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          createEvent(values, params.roomId).then(() => {
            setTimeout(() => {
              router.push(`/room/${params.roomId}`);
            }, 2000);
          });
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col items-center w-1/4 p-4">
            <CustomInputField
              name={`name`}
              type="text"
              placeholder={t("eventName")}
              withLabel={true}
            />

            <CustomInputField
              name={`description`}
              type="text"
              placeholder={t("eventDescription")}
              withLabel={true}
            />

            <div className="text-primary text-xs font-bold">Options</div>
            <FieldArray name="options">
              {({ push, remove }) => (
                <div className="flex flex-col items-center">
                  {values.options.map((field, index) => (
                    <div
                      key={index}
                      className="relative flex justify-center items-center w-full space-x-2"
                    >
                      <CustomInputField
                        name={`options[${index}].name`}
                        type="text"
                        placeholder={t("optionName")}
                        withLabel={false}
                      />
                      <CustomInputField
                        name={`options[${index}].odds`}
                        type="number"
                        placeholder={t("optionOdds")}
                        withLabel={false}
                      />
                      <button
                        type="button"
                        className="text-sm absolute -right-10"
                        onClick={() => remove(index)}
                      >
                        <Image
                          src="/cross.svg"
                          alt="cross"
                          width={20}
                          height={20}
                        />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="my-2 text-gray-400 px-3 py-2"
                    onClick={() => push({ name: "", odds: "" })}
                  >
                    <Image src="/plus.svg" alt="plus" width={25} height={25} />
                  </button>
                </div>
              )}
            </FieldArray>

            <div className={"flex justify-center items-center"}>
              <button
                className="flex justify-center items-center bg-primary-brighter text-background-accent hover:bg-primary rounded-sm m-2 transition-all"
                type="submit"
              >
                {loading ? (
                  <Loader />
                ) : (
                  <p className="text-sm"> {t("eventCreate")}</p>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEvent;
