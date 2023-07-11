import React, { useEffect } from "react";
import { gsap } from "gsap";

import styles from "../../styles/pages/signup/SignUp.module.scss";

import SignUp from "@/components/SignUp/SignUp";

const SignupPage = () => {
  useEffect(() => {
    gsap.fromTo(".signup-page-section", { x: 1000 }, { x: 0, ease: "power6" });
  }, []);

  return (
    <section className={`signup-page-section ${styles["section"]}`}>
      <SignUp className={styles["signup"]} />
    </section>
  );
};

export default SignupPage;
