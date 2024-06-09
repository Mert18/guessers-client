'use client'
import { createEvent } from '@/api/event';
import { Field, FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const CreateEvent = ({params}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const initialValues = {
    name: "",
    description: "",
    options: [{ name: "", odds: "" }]
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          createEvent(values, params.roomId).then(() => {
            setTimeout(() => {
              router.push(`/room/${params.roomId}`);
            }, 2000)
          })
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col justify-center items-center">
            <Field
              name="name"
              className="text-center text-sm px-2 py-1 text-red outline-none focus:border-b-2 border-b bg-white border-red input-field"
              type="text"
              autoComplete="off"
            />

            <Field
              name="description"
              className="text-center text-sm px-2 py-1 text-red outline-none focus:border-b-2 border-b bg-white border-red input-field"
              type="text"
              autoComplete="off"
            />

            <FieldArray name="options">
              {({ push, remove }) => (
                <div className="w-full">
                  {values.options.map((field, index) => (
                    <div key={index} className="flex justify-center items-center space-x-2">
                      <Field
                        name={`options[${index}].name`}
                        className="text-center text-sm px-2 py-1 text-red outline-none focus:border-b-2 border-b bg-white border-red input-field"
                        type="text"
                        placeholder="Name"
                      />
                      <Field
                        name={`options[${index}].odds`}
                        className="text-center text-sm px-2 py-1 text-red outline-none focus:border-b-2 border-b bg-white border-red input-field"
                        type="number"
                        placeholder="Odds"
                      />
                      <button
                        type="button"
                        className="text-red text-sm"
                        onClick={() => remove(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="my-2 text-gray-400 px-3 py-2"
                    onClick={() => push({ name: '', odds: '' })}
                  >
                    Add Field
                  </button>
                </div>
              )}
            </FieldArray>

            <div className={"flex justify-center items-center"}>
              <button className="my-2 text-gray-400 px-3 py-2" type="submit">
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
}

export default CreateEvent