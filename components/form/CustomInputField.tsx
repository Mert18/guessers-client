import { Field, useField } from "formik";

interface ICustomInputField {
  name: string;
  type: string;
  placeholder: string;
  withLabel: boolean;
  options?: { value: string | number | boolean; label: string }[];
  width?: string;
  placeholderInside?: boolean;
}

const CustomInputField = ({
  name,
  type,
  placeholder,
  withLabel,
  options,
  width = "full",
  placeholderInside = false
}: ICustomInputField) => {
  const [field, meta] = useField(name);
  const renderField = (type: string) => {
    if (type === "text" || type === "password") {
      return (
        <div className="relative w-full">
          <Field
            {...field}
            className={`w-${width} text-sm px-2 text-text font-bold outline-none border-b border-primary bg-transparent my-1 h-8 rounded-sm focus:ring-2 focus:ring-primary`}
            type={type}
            autoComplete="off"
            placeholder={placeholderInside ? "" : placeholder}
          />
          <label
            className={`absolute left-2 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out ${
              meta.touched && meta.error ? "text-red-500" : "text-gray-500"
            } ${field.value ? "text-xs -top-2" : ""}`}
          >
            {placeholder}
          </label>
        </div>
      );
    } else if (type === "select") {
      return (
        <Field
          as="select"
          className={`w-${width} text-sm px-2 text-text font-bold outline-none border-b border-primary bg-transparent my-1 h-8 rounded-sm focus:ring-2 focus:ring-primary`}
          name={name}
        >
          {options?.map((option) => (
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
          className={`w-${width} text-sm px-2 py-1 text-text font-bold outline-none border-b border-primary bg-transparent my-1 h-8 rounded-sm focus:ring-2 focus:ring-primary`}
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
