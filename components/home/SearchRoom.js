"use client";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import CustomInputField from "../form/CustomInputField";
import PrimaryButton from "../common/button/PrimaryButton";
import { useTranslation } from "react-i18next";
import { searchRoom } from "@/api/room";
import PublicRoomCard from "./PublicRoomCard";

const SearchRoom = () => {
  const [loading, setLoading] = useState(false);
  const [paging, setPaging] = useState({ page: 0, size: 10 });
  const [roomsResult, setRoomsResult] = useState([]);
  const { t } = useTranslation();

  const initialValues = {
    query: "",
  };

  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setLoading(true);
          searchRoom(values.query, paging).then((response) => {
            setRoomsResult(response.data.content);
          });
        }}
      >
        <Form className="flex flex-col justify-center items-center my-8 w-full">
          <CustomInputField
            name={`query`}
            type="text"
            placeholder={t("searchRoom")}
            withLabel={true}
          />

          <PrimaryButton type="submit" text={t("searchRoom")} />
        </Form>
      </Formik>

      <div className="w-full">
        {roomsResult?.map((room) => (
          <PublicRoomCard key={room.id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default SearchRoom;
