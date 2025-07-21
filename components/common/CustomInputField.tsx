import { Field } from "formik";

interface ICustomInputField {
  name: string;
  type: string;
  placeholder: string;
  withLabel: boolean;
  options?: { value: string | number | boolean; label: string }[];
  width?: string;
}

const CustomInputField = ({
  name,
  type,
  placeholder,
  withLabel,
  options,
  width = "full",
}: ICustomInputField) => {
  const renderField = (type: string) => {
    if (type === "text" || type === "password") {
      return (
        <Field
          name={name}
          className={`w-${width} px-2 font-bold text-primary outline-none border border-primary h-10 focus:ring-2 focus:ring-primary rounded-md`}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
        />
      );
    } else if (type === "select") {
      return (
        <Field
          as="select"
          className={`w-${width} px-2 font-bold text-primary outline-none border border-primary h-10 focus:ring-2 focus:ring-primary rounded-md`}
          name={name}
        >
          {options?.map((option) => (
            // @ts-ignore
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
          className={`w-${width} px-2 py-1 font-bold text-primary outline-none border border-primary h-10 focus:ring-2 focus:ring-primary rounded-md`}
          min={"1.00"}
          autoComplete="off"
          placeholder={placeholder}
        />
      );
    }
  };
  return (
    <div
      className={`flex flex-col text-primary justify-start items-start w-${width} my-0.5`}
    >
      {withLabel && <span className="text-primary">{placeholder}</span>}
      {renderField(type)}
    </div>
  );
};

export default CustomInputField;
