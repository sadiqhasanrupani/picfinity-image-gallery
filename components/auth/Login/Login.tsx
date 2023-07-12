import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";

//^ styles
import styles from "./Login.module.scss";

//^ component
import LoginForm from "./LoginForm/LoginForm";
import Logo from "../../Logo/Logo";
import Card from "@/components/Cards/Card/Card";

const Login = () => {
  useEffect(() => {
    gsap.fromTo(".login-card-div", { x: 1000 }, { x: 0, ease: "power6" });
  }, []);

  return (
    <Card className={`login-card-div ${styles["login-card"]}`}>
      <Logo className={styles["logo"]} />
      <LoginForm className={styles["login-form"]} />
      <div className={styles["description"]}>
        <p>Don't have an account?</p>
        <Link href={"/signup"} replace>
          Register
        </Link>
      </div>
    </Card>
  );
};

export default Login;
