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
          className={`w-${width}  px-2 text-text font-bold outline-none border border-primary bg-background-bright h-8 focus:ring-2 focus:ring-primary rounded-md`}
          type={type}
          autoComplete="off"
          placeholder={placeholderInside ? placeholder : ""}
        />
      );
    } else if (type === "select") {
      return (
        <Field
          as="select"
          className={`w-${width}  px-2 text-text font-bold outline-none border border-primary h-8 focus:ring-2 focus:ring-primary bg-background-bright rounded-md`}
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
          className={`w-${width}  px-2 py-1 text-text font-bold outline-none border border-primary bg-background-bright h-8 focus:ring-2 focus:ring-primary rounded-md`}
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
        <span className="text-text ">
          {placeholder}
        </span>
      )}
      {renderField(type)}
    </div>
  );
};

export default CustomInputField;
