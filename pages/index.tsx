import { useEffect } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { gsap } from "gsap";

//^ styles
import styles from "./home.module.scss";

//^ components
import SignUp from "@/components/SignUp/SignUp";

const Home: React.FC = () => {
  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user) {
      localStorage.setItem("token", session.user.email as string);

      router.replace("/gallery");
    }
  }, [session]);

  useEffect(() => {
    gsap.fromTo(".signup-card-div", { y: 1000 }, { y: 0, ease: "power4" });
  }, []);

  return (
    <div className={`signup-card-div home-div ${styles.page}`}>
      {loading ? "Loading..." : <SignUp />}
    </div>
  );
};

export default Home;
