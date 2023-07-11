import { HTMLAttributes, ReactNode } from "react";
import styles from "./PrimaryBtn.module.scss";

interface PrimaryBtnProps extends HTMLAttributes<HTMLButtonElement> {
  children: any;
  disabled?: boolean;
}

const PrimaryBtn = ({ children, className, disabled }: PrimaryBtnProps) => {
  return (
    <button disabled={disabled} className={`${styles["btn"]} ${className}`}>
      {children}
    </button>
  );
};

export default PrimaryBtn;
