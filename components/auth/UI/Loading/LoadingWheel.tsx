import React, { HTMLAttributes } from "react";

import styles from "./LoadingWheel.module.scss";

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  loader?: string;
}

const LoadingWheel = ({ className, loader }: LoadingProps) => {
  return (
    <>
      <div className={`${styles.loader}`}>
        <div className={`${styles.spinner} ${className}`} />
      </div>
    </>
  );
};

export default LoadingWheel;
