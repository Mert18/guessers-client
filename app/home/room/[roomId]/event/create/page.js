"use client";
import { createEvent } from "@/api/event";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import SecondaryButton from "@/components/common/button/SecondaryButton";
import CustomInputField from "@/components/form/CustomInputField";
import { FieldArray, Form, Formik } from "formik";
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
    eventGuessOptions: [
      {
        name: "",
        eventGuessOptionCases: [{ name: "", odds: 1.01 }],
      },
    ],
  };

  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      <div className="text-primary text-2xl font-bold text-center">
        {t("eventCreate")}
      </div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          createEvent(values, params.roomId).then(() => {
            setTimeout(() => {
              router.push(`/home/room/${params.roomId}`);
            }, 2000);
          });
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col items-start p-4 w-full">
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

            <span className="text-text text-xs lowercase">
              {t("guessOptions")}
            </span>

            <FieldArray name="eventGuessOptions">
              {({
                push: pushEventGuessOption,
                remove: removeEventGuessOption,
              }) => (
                <div className="flex flex-col items-center w-full">
                  {values.eventGuessOptions.map(
                    (eventGuessOption, eventGuessOptionIndex) => (
                      <div
                        key={eventGuessOptionIndex}
                        className="relative flex flex-col items-center w-full space-y-2 my-2"
                      >
                        <CustomInputField
                          name={`eventGuessOptions[${eventGuessOptionIndex}].name`}
                          type="text"
                          placeholder={t("optionName")}
                          withLabel={true}
                        />
                        <span className="text-text text-xs lowercase">
                          {t("guessOptionCases")}
                        </span>
                        <FieldArray
                          name={`eventGuessOptions[${eventGuessOptionIndex}].eventGuessOptionCases`}
                        >
                          {({
                            push: pushEventGuessOptionOption,
                            remove: removeEventGuessOptionOption,
                          }) => (
                            <div className="flex flex-col items-center w-1/2 space-y-2">
                              {values.eventGuessOptions[
                                eventGuessOptionIndex
                              ].eventGuessOptionCases.map(
                                (
                                  eventGuessOptionOption,
                                  eventGuessOptionOptionIndex
                                ) => (
                                  <div
                                    key={eventGuessOptionOptionIndex}
                                    className="flex justify-center items-center w-full space-x-2"
                                  >
                                    <CustomInputField
                                      name={`eventGuessOptions[${eventGuessOptionIndex}].eventGuessOptionCases[${eventGuessOptionOptionIndex}].name`}
                                      type="text"
                                      placeholder={t("caseName")}
                                      withLabel={true}
                                      placeholderInside={true}
                                    />
                                    <input
                                      onChange={(e) => {
                                        values.eventGuessOptions[
                                          eventGuessOptionIndex
                                        ].eventGuessOptionCases[
                                          eventGuessOptionOptionIndex
                                        ].odds = parseFloat(e.target.value);
                                      }}
                                      type="number"
                                      name={`eventGuessOptions[${eventGuessOptionIndex}].eventGuessOptionCases[${eventGuessOptionOptionIndex}].odds`}
                                      placeholder={t("optionOdds")}
                                      className="w-1/4 text-sm px-2 py-1 text-text outline-none bg-background2 my-1 h-8 rounded-sm focus:ring-2 focus:ring-primary"
                                      step={"0.01"}
                                      min={"1.00"}
                                      defaultValue={1.01}
                                    />

                                    <button
                                      type="button"
                                      className="text-sm"
                                      onClick={() =>
                                        removeEventGuessOptionOption(
                                          eventGuessOptionOptionIndex
                                        )
                                      }
                                    >
                                      <Image
                                        src="/cross.svg"
                                        alt="cross"
                                        width={30}
                                        height={30}
                                        className=""
                                      />
                                    </button>
                                  </div>
                                )
                              )}
                              <SecondaryButton
                                type="button"
                                text={t("addGuessOptionCase")}
                                onClick={() =>
                                  pushEventGuessOptionOption({
                                    name: "",
                                    odds: 1.01,
                                  })
                                }
                              />
                            </div>
                          )}
                        </FieldArray>
                        <button
                          type="button"
                          className="text-sm"
                          onClick={() =>
                            removeEventGuessOption(eventGuessOptionIndex)
                          }
                        >
                          <Image
                            src="/cross.svg"
                            alt="cross"
                            width={30}
                            height={30}
                          />
                        </button>
                      </div>
                    )
                  )}
                  <SecondaryButton
                    type="button"
                    text={t("addGuessOption")}
                    onClick={() =>
                      pushEventGuessOption({
                        name: "",
                        eventGuessOptionCases: [{ name: "", odds: 1.01 }],
                      })
                    }
                  />
                </div>
              )}
            </FieldArray>

            <div className={"flex justify-center items-center w-full"}>
              <PrimaryButton type="submit" text={t("eventCreate")} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEvent;
