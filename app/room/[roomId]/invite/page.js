"use client";
import { invitePeople } from "@/api/room";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const InvitePeople = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    username: "",
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          values.roomId = params.roomId;
          invitePeople(values);
        }}
      >
        <Form className="flex flex-col justify-center items-center">
          <Field
            placeholder="Username"
            name="username"
            className="text-center text-sm px-2 py-1 text-red outline-none focus:border-b-2 border-b bg-white border-red input-field"
            type="text"
            autoComplete="off"
          />

          <div className={"flex justify-center items-center"}>
            <button className="my-2 text-gray-400 px-3 py-2" type="submit">
              {loading ? (
                <Loader />
              ) : (
                <p className="text-red text-sm">Invite</p>
              )}
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default InvitePeople;
