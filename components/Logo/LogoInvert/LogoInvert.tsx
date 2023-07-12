import React, { HTMLAttributes } from "react";
import Image from "next/image";

import styles from "./LogoInvert.module.scss";

import sunflower from "../../../assets/sunflowe.jpg";

const Logo = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`${styles["logo"]} ${className}`}>
      <Image
        className={styles["logo-img"]}
        src={sunflower}
        alt="logo-img"
        placeholder="blur"
        priority
        width={55}
        height={55}
      />
      <p>Picfinity</p>
    </div>
  );
};

export default Logo;
