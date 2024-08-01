import { Field } from "formik";
import React from "react";

const CustomInputField = ({ name, type, placeholder, withLabel, width = "full"}) => {
  return (
    <div className="flex flex-col justify-start items-start">
      {withLabel && (
        <span className="text-text text-xs lowercase">{placeholder}</span>
      )}
      <Field
        name={name}
        className={`w-${width} text-sm px-2 py-1 text-text outline-none bg-background_lighter my-1 h-8 rounded-sm focus:ring-2 focus:ring-primary`}
        type={type}
        step={type === "number" ? "0.01" : null}
        min={type === "number" ? "1" : null}
        autoComplete="off"
      />
    </div>
  );
};

export default CustomInputField;
