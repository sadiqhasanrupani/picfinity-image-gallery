//^ components
import Login from "../components/auth/Login/Login";

import styles from "./home.module.scss";

const home = () => {
  return (
    <>
      <div className={`${styles["page"]}`}>
        <Login />
      </div>
    </>
  );
};

export default home;
