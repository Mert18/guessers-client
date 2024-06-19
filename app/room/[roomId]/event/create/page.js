"use client";
import { createEvent } from "@/api/event";
import CustomInputField from "@/components/form/CustomInputField";
import { Field, FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateEvent = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    name: "",
    description: "",
    options: [{ name: "", odds: "" }],
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-primary text-2xl font-bold text-center">
        Create Event
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
              placeholder="Name"
              withLabel={true}
            />

            <CustomInputField
              name={`description`}
              type="text"
              placeholder="Description"
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
                        placeholder="Name"
                        withLabel={false}
                      />
                      <CustomInputField
                        name={`options[${index}].odds`}
                        type="number"
                        placeholder="Odds"
                        withLabel={false}
                      />
                      <button
                        type="button"
                        className="text-red text-sm absolute -right-10"
                        onClick={() => remove(index)}
                      >
                    <Image src="/cross.svg" alt="cross" width={20} height={20} />
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
              <button className="p-2 mr-2 bg-primary text-background font-bold hover:bg-primary-brighter" type="submit">
                {loading ? (
                  <Loader />
                ) : (
                  <p className="text-red text-sm">Create Event</p>
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
