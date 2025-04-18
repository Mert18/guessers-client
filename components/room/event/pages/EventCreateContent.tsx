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
import ListReadyEvents from "../ListReadyEvents";
import Modal from "@/components/common/Modal";

interface ICreateEventContentProps {
  params: { roomId: string };
}

const CreateEventSchema = Yup.object().shape({
  name: Yup.string().required("Event Name is Required."),
});

const EventCreateContent = ({ params }: ICreateEventContentProps) => {
  const [createReadyEventModalOpen, setCreateReadyEventModalOpen] =
    useState<boolean>(false);
  const [room, setRoom] = useState<IRoomBasic>();
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleCloseReadyEventModal = () => {
    setCreateReadyEventModalOpen(false);
  };

  useEffect(() => {
    getRoom(params.roomId).then((response) => {
      setRoom(response.data);
    });
  }, [params.roomId]);

  return (
    <div className="flex flex-col justify-center items-center">
      {room?.name && <RoomName roomName={room.name} roomId={params.roomId} />}

      <div className="text-text text-xl font-bold text-center py-2">
        Create Event
      </div>

      <CustomButton
        type="submit"
        text="Create From Ready Event"
        onClick={() => setCreateReadyEventModalOpen(true)}
      />

      {createReadyEventModalOpen && (
        <Modal
          title={"Ready Events"}
          handleCloseModal={handleCloseReadyEventModal}
        >
          <ListReadyEvents
            handleCloseReadyEventModal={handleCloseReadyEventModal}
            roomId={params.roomId}
          />
        </Modal>
      )}

      <p className="my-2 text-text">or create manually.</p>

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
          } else if (
            values.eventGuessOptions.some((option) =>
              option.eventGuessOptionCases.some(
                (optionCase) => optionCase.odds < 1.01
              )
            )
          ) {
            toast.error("Odds should be greater than 1.00.");
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
                          eventGuessOptionCases: [{ name: "", odds: 1.01 }],
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
                                      placeholder={"optionOdds"}
                                      className="w-2/3 px-2 py-1 outline-none border border-primary h-8 focus:ring-1 focus:ring-primary font-bold rounded-md"
                                      step={"0.01"}
                                      min={"1.00"}
                                      defaultValue={1.01}
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
                                    name: "",
                                    odds: 1.01,
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
