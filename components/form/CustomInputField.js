import { Field } from "formik";
import React from "react";

const CustomInputField = ({
  name,
  type,
  placeholder,
  withLabel,
  options,
  width = "full",
  placeholderInside = false
}) => {
  const renderField = (type) => {
    if (type === "text" || type === "password") {
      return (
        <Field
          name={name}
          className={`w-${width} text-sm px-2 text-text font-bold outline-none border border-primary bg-background my-1 h-8 rounded-sm focus:ring-2 focus:ring-primary`}
          type={type}
          step={type === "number" ? "1.00" : null}
          min={type === "number" ? "1.00" : null}
          autoComplete="off"
          autoSuggestions="off"
          placeholder={placeholderInside ? placeholder : ""}
        />
      );
    } else if (type === "select") {
      return (
        <Field
          as="select"
          className={`w-${width} text-sm px-2 text-text font-bold outline-none border border-primary bg-background my-1 h-8 rounded-sm focus:ring-2 focus:ring-primary`}
          name={name}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
      );
    } else if (type === "number") {
      return (
        <Field
          name={name}
          type={type}
          className={`w-${width} text-sm px-2 py-1 text-text font-bold outline-none border border-primary bg-background my-1 h-8 rounded-sm focus:ring-2 focus:ring-primary`}
          min={"1.00"}
          autoComplete="off"
          placeholder={placeholderInside ? placeholder : ""}
        />
      );
    }
  };
  return (
    <div className={`flex flex-col justify-start items-start my-1 w-${width}`}>
      {withLabel && !placeholderInside && (
        <span className="text-primary text-sm font-bold lowercase">{placeholder}</span>
      )}
      {renderField(type)}
    </div>
  );
};

export default CustomInputField;
