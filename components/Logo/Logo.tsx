import React from "react";
import Image from "next/image";

import styles from "./Logo.module.scss";

import sunflower from "../../assets/sunflowe.jpg";

const Logo = ({ className }: any) => {
  return (
    <div className={`${styles["logo"]} ${className}`}>
      <Image className={styles["logo-img"]} src={sunflower} alt="logo-img" />
      <p>Picfinity</p>
    </div>
  );
};

export default Logo;
