import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gsap } from "gsap";

//^ styles
import styles from "./home.module.scss";

//^ client auth
import { getAccessToken } from "@/lib/auth/client-auth";

//^ components
import SignUp from "@/components/SignUp/SignUp";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const jwtToken = getAccessToken();

  useEffect(() => {
    if (!jwtToken) {
      setIsLoading(false);
    } else {
      router.replace("/gallery");
    }
  }, []);

  const router = useRouter();

  useEffect(() => {
    gsap.fromTo(".signup-card-div", { y: 1000 }, { y: 0, ease: "power4" });
  }, []);

  return (
    <div className={`signup-card-div home-div ${styles.page}`}>
      {isLoading ? "Loading..." : <SignUp />}
    </div>
  );
};

export default Home;
