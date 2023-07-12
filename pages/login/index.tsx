import React, { useEffect } from "react";
import { gsap } from "gsap";

import styles from "../../styles/pages/signup/SignUp.module.scss";

import Login from "@/components/auth/Login/Login";

const SignupPage = () => {
  useEffect(() => {
    gsap.fromTo(".login-page-section", { y: 1000 }, { y: 0, ease: "power4" });
  }, []);

  return (
    <section className={`login-page-section ${styles["section"]}`}>
      <Login className={styles["signup"]} />
    </section>
  );
};

export default SignupPage;
