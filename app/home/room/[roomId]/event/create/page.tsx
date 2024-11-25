"use client";
import { createEvent } from "@/api/event";
import { getRoom } from "@/api/room";
import PrimaryButton from "@/components/common/button/PrimaryButton";
import ListReadyEvents from "@/components/events/ListReadyEvents";
import CustomInputField from "@/components/form/CustomInputField";
import Modal from "@/components/Modal";
import { IRoomBasic } from "@/types/IRoom.model";
import { FieldArray, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ICreateEventProps {
  params: { roomId: string };
}

const CreateEvent = ({ params }: ICreateEventProps) => {
  const [createReadyEventModalOpen, setCreateReadyEventModalOpen] =
    useState<boolean>(false);
  const [room, setRoom] = useState<IRoomBasic>();
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
    <div className="flex flex-col justify-center items-center text-text">
      <h2 className="font-bold text-text my-4">{room?.name}</h2>
      <div className="text-primary text-xl font-bold text-center py-2">
        Create Event
      </div>

      <PrimaryButton
        type="submit"
        text="Create From Ready Event"
        onClick={() => setCreateReadyEventModalOpen(true)}
        bg={true}
      />

      {createReadyEventModalOpen && (
        <Modal
          title={"readyEvents"}
          handleCloseModal={handleCloseReadyEventModal}
        >
          <ListReadyEvents
            handleCloseReadyEventModal={handleCloseReadyEventModal}
            roomId={params.roomId}
          />
        </Modal>
      )}

      <p className="my-2">or create manually.</p>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          createEvent({event: values, roomId: params.roomId}).then(() => {
            setTimeout(() => {
              router.push(`/home/room/${params.roomId}/guess`);
            }, 2000);
          });
        }}
      >
        {({ values }) => (
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
                  <div className="my-4">
                  <PrimaryButton
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
                        className="flex flex-col items-start w-full space-y-2 my-2"
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

            <div className={"flex justify-center items-center w-full my-8"}>
              <PrimaryButton type="submit" text={"Create Event"} bg={true} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateEvent;
