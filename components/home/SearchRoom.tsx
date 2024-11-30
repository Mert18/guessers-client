"use client";
import { Form, Formik } from "formik";
import { useState } from "react";
import CustomInputField from "../form/CustomInputField";
import PrimaryButton from "../common/button/PrimaryButton";
import { searchRoom } from "@/api/room";
import PublicRoomCard from "./PublicRoomCard";
import { IPaging } from "@/types/IRequest.model";

const SearchRoom = () => {
  const [paging, setPaging] = useState<IPaging>({ page: 0, size: 10 });
  const [roomsResult, setRoomsResult] = useState([]);

  const initialValues = {
    query: "",
  };

  return (
    <div className="flex flex-col justify-center items-center w-1/2">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          searchRoom({query: values.query, paging: paging}).then((response) => {
            setRoomsResult(response.data.content);
          });
        }}
      >
        <Form className="flex flex-col justify-center items-center my-8 w-full">
          <CustomInputField
            name={`query`}
            type="text"
            placeholder={"searchRoom"}
            withLabel={true}
          />

          <PrimaryButton type="submit" text={"searchRoom"} />
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
