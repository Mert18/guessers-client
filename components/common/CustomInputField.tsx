import { Field } from "formik";

interface ICustomInputField {
  name: string;
  type: string;
  placeholder: string;
  withLabel: boolean;
  options?: { value: string | number | boolean; label: string }[];
  width?: string;
  placeholderInside?: boolean;
  one?: boolean
}

const CustomInputField = ({
  name,
  type,
  placeholder,
  withLabel,
  options,
  width = "full",
  placeholderInside = false,
  one = true
}: ICustomInputField) => {
  const renderField = (type: string) => {
    if (type === "text" || type === "password") {
      return (
        <Field
          name={name}
          className={`w-${width} text-sm px-2 ${one ? "text-primary-one border-primary-one focus:ring-primary-one" : "text-primary-two border-primary-two focus:ring-primary-two"} font-bold outline-none border  h-8 focus:ring-1 rounded-md bg-light-bg-sec dark:bg-dark-bg-sec`}
          type={type}
          autoComplete="off"
          placeholder={placeholderInside ? placeholder : ""}
        />
      );
    } else if (type === "select") {
      return (
        <Field
          as="select"
          className={`w-${width} text-sm px-2 ${one ? "text-primary-one border-primary-one focus:ring-primary-one" : "text-primary-two border-primary-two focus:ring-primary-two"} font-bold outline-none border h-8 focus:ring-2 rounded-md bg-light-bg-sec dark:bg-dark-bg-sec`}
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
          className={`w-${width} text-sm px-2 py-1 ${one ? "text-primary-one border-primary-one focus:ring-primary-one" : "text-primary-two border-primary-two focus:ring-primary-two"} font-bold outline-none border h-8 focus:ring-2 rounded-md bg-light-bg-sec dark:bg-dark-bg-sec`}
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
        <span className="text-sm text-light-text dark:text-dark-text">
          {placeholder}
        </span>
      )}
      {renderField(type)}
    </div>
  );
};

export default CustomInputField;
