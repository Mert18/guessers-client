import { Field } from "formik";

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
  placeholderInside = false,
}: ICustomInputField) => {
  const renderField = (type: string) => {
    if (type === "text" || type === "password") {
      return (
        <Field
          name={name}
          className={`w-${width} text-sm px-2 text-text-default font-bold outline-none border border-primary-default bg-background-bright h-8 focus:ring-2 focus:ring-primary-default`}
          type={type}
          autoComplete="off"
          placeholder={placeholderInside ? placeholder : ""}
        />
      );
    } else if (type === "select") {
      return (
        <Field
          as="select"
          className={`w-${width} text-sm px-2 text-text-default font-bold outline-none border border-primary-default h-8 focus:ring-2 focus:ring-primary-default bg-background-bright`}
          name={name}
        >
          {options?.map((option) => (
            // @ts-ignore
            <option className="bg-background" key={option.value} value={option.value}>
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
          className={`w-${width} text-sm px-2 py-1 text-text-default font-bold outline-none border border-primary-default bg-background-bright h-8 focus:ring-2 focus:ring-primary-default`}
          min={"1.00"}
          autoComplete="off"
          placeholder={placeholderInside ? placeholder : ""}
        />
      );
    }
  };
  return (
    <div className={`flex flex-col justify-start items-start w-${width} my-0.5`}>
      {withLabel && !placeholderInside && (
        <span className="text-text-default text-sm font-light">
          {placeholder}
        </span>
      )}
      {renderField(type)}
    </div>
  );
};

export default CustomInputField;
