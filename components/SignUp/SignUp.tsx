import React, { HTMLAttributes } from "react";
import { signIn } from "next-auth/client";

//^ styles
import styles from "../../styles/components/Signup.module.scss";

//^ components
import Card from "../Cards/Card/Card";
import Logo from "../Logo/Logo";
import SignupForm from "./SignUpForm/SignUpForm";
import Link from "next/link";

const SignUp = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <article className={styles["article"]}>
      <Card>
        <Logo className={styles["logo"]} />
        <SignupForm className={styles["signup-form"]} />
        <div className={styles["description"]}>
          <p>Already have an account?</p>
          <Link href={"/login"} replace>Login</Link>
        </div>
      </Card>
    </article>
  );
};

export default SignUp;
