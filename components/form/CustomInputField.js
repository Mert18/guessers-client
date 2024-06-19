import { Field } from "formik";
import React from "react";

const CustomInputField = ({ name, type, placeholder, withLabel, width = "full"}) => {
  return (
    <div className="flex flex-col justify-start items-start">
      {withLabel && (
        <span className="text-primary text-xs font-bold">{placeholder}</span>
      )}
      <Field
        name={name}
        className={`w-${width} text-center text-sm px-2 py-1 text-primary outline-none bg-background-brighter my-1 h-8 input-field`}
        type={type}
        step={type === "number" ? "0.01" : null}
        min={type === "number" ? "1" : null}
        autoComplete="off"
      />
    </div>
  );
};

export default CustomInputField;
