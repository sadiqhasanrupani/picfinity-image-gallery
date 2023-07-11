import React, {
  FC,
  ReactNode,
  ChangeEvent,
  FocusEvent,
  HTMLAttributes,
} from "react";
import styles from "./Card.module.scss";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
  onChange?: (event: ChangeEvent<HTMLDivElement>) => void;
}

const Card: FC<CardProps> = ({
  className,
  children,
  onBlur,
  onChange,
  ...rest
}) => {
  return (
    <div
      className={`${styles.card} ${className}`}
      onBlur={onBlur}
      onChange={onChange}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
