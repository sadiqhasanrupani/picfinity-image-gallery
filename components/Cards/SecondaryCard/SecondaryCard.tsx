import React from "react";

//^ style component
import styles from "./SecondaryCard.module.scss";

import { CardProps } from "../Card/Card";
export interface SecondaryCard extends CardProps {}

const SecondaryCard = ({ className, children }: CardProps) => {
  return <div className={`${styles["card"]} ${className}`}>{children}</div>;
};

export default SecondaryCard;
