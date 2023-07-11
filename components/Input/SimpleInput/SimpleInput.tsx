import { FC, HTMLAttributes } from "react";

import styles from "./SimpleInput.module.scss";

interface SimpleInputProps extends HTMLAttributes<HTMLDivElement> {
  inputMessage?: string;
  hasError?: boolean;
  Icon?: FC;
  type?: "text" | "number" | "password";
  name?: string;
  required?: boolean;
  value?: string | number;
}

const SimpleInput = ({
  className,
  onChange,
  onBlur,
  type,
  name,
  id,
  placeholder,
  required,
  onClick,
  Icon,
  value,
  defaultValue,
  inputMessage,
  hasError,
}: SimpleInputProps) => {
  return (
    <div
      className={`${styles["simple-input-div"]} ${
        hasError && styles["is-valid"]
      } ${className}`}
    >
      <input
        type={type}
        className={`${styles["simple-input"]} `}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        defaultValue={defaultValue}
      />

      <h6>{inputMessage}</h6>
    </div>
  );
};

export default SimpleInput;
