import { Field } from "formik";
import React from "react";

const CustomInputField = ({
  name,
  type,
  placeholder,
  withLabel,
  options,
  width = "full",
}) => {
  const renderField = (type) => {
    if (type === "text" || type === "password" || type === "number") {
      return (
        <Field
          name={name}
          className={`w-${width} text-sm px-2 py-1 text-text outline-none bg-background_lighter my-1 h-8 rounded-sm focus:ring-2 focus:ring-primary`}
          type={type}
          step={type === "number" ? "0.01" : null}
          min={type === "number" ? "1" : null}
          autoComplete="off"
        />
      );
    } else if (type === "select") {
      return (
        <Field
          as="select"
          className={`w-${width} text-sm px-2 py-1 text-text outline-none bg-background_lighter my-1 h-8 rounded-sm focus:ring-2 focus:ring-primary`}
          name={name}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      );
    }
  };
  return (
    <div className={`flex flex-col justify-start items-start w-${width}`}>
      {withLabel && (
        <span className="text-text text-xs lowercase">{placeholder}</span>
      )}
      {renderField(type)}
    </div>
  );
};

export default CustomInputField;
