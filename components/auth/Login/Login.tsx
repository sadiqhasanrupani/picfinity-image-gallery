import { HTMLAttributes } from "react";
import Link from "next/link";

//^ styles
import styles from "./Login.module.scss";

//^ component
import LoginForm from "./LoginForm/LoginForm";
import Logo from "../../Logo/Logo";
import Card from "@/components/Cards/Card/Card";

const Login = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card className={`login-card-div ${styles["login-card"]} ${className}`}>
      <Logo className={styles["logo"]} />
      <LoginForm className={styles["login-form"]} />
      <div className={styles["description"]}>
        <p>Don't have an account?</p>
        <Link href={"/"} replace>
          Register
        </Link>
      </div>
    </Card>
  );
};

export default Login;
