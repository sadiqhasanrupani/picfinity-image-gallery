//^ components
import Login from "../components/auth/Login/Login";

import styles from "./home.module.scss";

const home = () => {
  return (
    <>
      <div className={`home-div ${styles["page"]}`}>
        <Login />
      </div>
    </>
  );
};

export default home;
