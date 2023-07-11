//^ styles
import styles from "./Login.module.scss";

//^ component
// import LoginForm from "./LoginForm/LoginForm.tsx";
import Logo from "../../Logo/Logo";
import Card from "@/components/Cards/Card/Card";

const login = () => {
  return (
    <Card className={styles['login-card']}>
      <Logo className={styles["logo"]} />
    </Card>
  );
};

export default login;
