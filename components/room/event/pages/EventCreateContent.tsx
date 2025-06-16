"use client";
import { createEvent } from "@/api/event";
import { getRoom } from "@/api/room";
import CustomButton from "@/components/common/CustomButton";
import Loader from "@/components/common/Loader";
import CustomInputField from "@/components/common/CustomInputField";
import RoomName from "@/components/room/layout/RoomName";
import { IRoomBasic } from "@/types/IRoom.model";
import { Formik, Form, FieldArray } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ICreateEventContentProps {
  params: { roomId: string };
}

const CreateEventSchema = Yup.object().shape({
  name: Yup.string().required("Event Name is Required."),
});

const EventCreateContent = ({ params }: ICreateEventContentProps) => {
  const [room, setRoom] = useState<IRoomBasic>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const initialValues = {
    name: "",
    description: "",
    eventGuessOptions: [
      {
        name: "",
        eventGuessOptionCases: [{ name: "" }],
      },
    ],
  };

  useEffect(() => {
    getRoom(params.roomId).then((response) => {
      setRoom(response.data);
    });
  }, [params.roomId]);

  return (
    <div className="flex flex-col justify-center items-center">
      {room?.name && <RoomName roomName={room.name} roomId={params.roomId} />}

      <div className="text-text font-bold text-center py-2">
        Create Event
      </div>

      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          if (values.eventGuessOptions.length < 1) {
            toast.error("At least one option is required.");
            return;
          } else if (
            values.eventGuessOptions.some(
              (option) => option.eventGuessOptionCases.length < 2
            )
          ) {
            toast.error("At least two cases are required for each option.");
            return;
          } else if (
            values.eventGuessOptions.some((option) => option.name === "")
          ) {
            toast.error("There should not be any empty option name.");
            return;
          } else if (
            values.eventGuessOptions.some((option) =>
              option.eventGuessOptionCases.some(
                (optionCase) => optionCase.name === ""
              )
            )
          ) {
            toast.error("There should not be any empty case name.");
            return;
          }

          setLoading(true);
          createEvent({ event: values, roomId: params.roomId })
            .then(() => {
              resetForm();
              setTimeout(() => {
                router.push(`/home/room/${params.roomId}/guess`);
              }, 1000);
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        validationSchema={CreateEventSchema}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ errors, values }) => (
          <Form className="flex flex-col items-center justify-center p-4 w-full">
            <CustomInputField
              withLabel={true}
              name="name"
              type="text"
              placeholder={"Event Name"}
            />

            <CustomInputField
              withLabel={true}
              name="description"
              type="text"
              placeholder={"Event Description"}
            />

            <FieldArray name="eventGuessOptions">
              {({
                push: pushEventGuessOption,
                remove: removeEventGuessOption,
              }) => (
                <div className="flex flex-col items-start w-full">
                  <div className="my-2">
                    <CustomButton
                      type="button"
                      text={"Add Option"}
                      onClick={() =>
                        pushEventGuessOption({
                          name: "",
                          eventGuessOptionCases: [{ name: "" }],
                        })
                      }
                    />
                  </div>

                  {values.eventGuessOptions.map(
                    (eventGuessOption, eventGuessOptionIndex) => (
                      <div
                        key={eventGuessOptionIndex}
                        className="flex flex-col items-start w-full space-y-2"
                      >
                        <div className="flex items-center">
                          <CustomInputField
                            withLabel={true}
                            name={`eventGuessOptions[${eventGuessOptionIndex}].name`}
                            type="text"
                            placeholder={"Option Name"}
                          />

                          <button
                            type="button"
                            className=" mt-5"
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

                        <FieldArray
                          name={`eventGuessOptions[${eventGuessOptionIndex}].eventGuessOptionCases`}
                        >
                          {({
                            push: pushEventGuessOptionOption,
                            remove: removeEventGuessOptionOption,
                          }) => (
                            <div className="flex flex-col items-start w-full space-y-2">
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
                                      withLabel={true}
                                      placeholderInside={true}
                                      name={`eventGuessOptions[${eventGuessOptionIndex}].eventGuessOptionCases[${eventGuessOptionOptionIndex}].name`}
                                      type="text"
                                      placeholder={"Case Name"}
                                    />

                                    <button
                                      type="button"
                                      className=""
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
                              <CustomButton
                                type="button"
                                text={"Add Case"}
                                onClick={() =>
                                  pushEventGuessOptionOption({
                                    name: ""
                                  })
                                }
                              />
                            </div>
                          )}
                        </FieldArray>
                      </div>
                    )
                  )}
                </div>
              )}
            </FieldArray>

            <div className="w-full text-failure">
              {errors.name && <p>{errors.name}</p>}
            </div>

            {loading ? (
              <Loader />
            ) : (
              <div className={"flex justify-center items-center w-full my-8"}>
                <CustomButton type="submit" text={"Create Event"} bg={true} />
              </div>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EventCreateContent;
