"use client";
import { createEvent } from "@/api/event";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ListReadyEvents from "@/components/events/ListReadyEvents";
import Modal from "@/components/Modal";
import { Field, FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const CreateEvent = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [createReadyEventModalOpen, setCreateReadyEventModalOpen] = useState();
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

  const handleCloseReadyEventModal = () => {
    setCreateReadyEventModalOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-primary text-2xl font-bold text-center py-4">
        {t("eventCreate")}
      </div>

      <PrimaryButton
        text="Create From Ready Event"
        onClick={() => setCreateReadyEventModalOpen(true)}
        noBg={true}
      />

      {createReadyEventModalOpen && (
        <Modal
          title={t("readyEvents")}
          handleCloseModal={handleCloseReadyEventModal}
        >
          <ListReadyEvents handleCloseReadyEventModal={handleCloseReadyEventModal} roomId={params.roomId} />
        </Modal>
      )}
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
          <Form className="flex flex-col items-center justify-center p-4 w-full">
            <Field
              name="name"
              type="text"
              className="w-full text-sm px-2 py-1 text-text outline-none bg-background border-b border-primary h-8 focus:ring-1 focus:ring-primary my-2"
              autoComplete="off"
              placeholder={t("eventName")}
            />

            <Field
              name="description"
              type="text"
              className="w-full text-sm px-2 py-1 text-text outline-none bg-background border-b border-primary h-8 focus:ring-1 focus:ring-primary my-2"
              autoComplete="off"
              placeholder={t("eventDescription")}
            />

            <FieldArray name="eventGuessOptions">
              {({
                push: pushEventGuessOption,
                remove: removeEventGuessOption,
              }) => (
                <div className="flex flex-col items-center w-2/3">
                  {values.eventGuessOptions.map(
                    (eventGuessOption, eventGuessOptionIndex) => (
                      <div
                        key={eventGuessOptionIndex}
                        className="relative flex flex-col items-center w-full space-y-2 my-2"
                      >
                        <Field
                          name={`eventGuessOptions[${eventGuessOptionIndex}].name`}
                          type="text"
                          className="w-full text-sm px-2 py-1 text-text outline-none bg-background border-b border-primary h-8 focus:ring-1 focus:ring-primary"
                          autoComplete="off"
                          placeholder={t("optionName")}
                        />

                        <FieldArray
                          name={`eventGuessOptions[${eventGuessOptionIndex}].eventGuessOptionCases`}
                        >
                          {({
                            push: pushEventGuessOptionOption,
                            remove: removeEventGuessOptionOption,
                          }) => (
                            <div className="flex flex-col items-center w-2/3 space-y-2">
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
                                    <Field
                                      name={`eventGuessOptions[${eventGuessOptionIndex}].eventGuessOptionCases[${eventGuessOptionOptionIndex}].name`}
                                      type="text"
                                      className="w-full text-sm px-2 py-1 text-text outline-none bg-background border-b border-primary h-8 focus:ring-1 focus:ring-primary my-1"
                                      autoComplete="off"
                                      placeholder={t("caseName")}
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
                                      className="w-2/3 text-sm px-2 py-1 text-text outline-none bg-background border-b border-primary h-8 focus:ring-1 focus:ring-primary my-1"
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
                              <PrimaryButton
                                type="button"
                                text={t("addGuessOptionCase")}
                                onClick={() =>
                                  pushEventGuessOptionOption({
                                    name: "",
                                    odds: 1.01,
                                  })
                                }
                                noBg={true}
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
                  <PrimaryButton
                    type="button"
                    text={t("addGuessOption")}
                    onClick={() =>
                      pushEventGuessOption({
                        name: "",
                        eventGuessOptionCases: [{ name: "", odds: 1.01 }],
                      })
                    }
                    noBg={true}
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
