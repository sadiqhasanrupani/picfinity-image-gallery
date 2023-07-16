import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { gsap } from "gsap";

//^ styles
import styles from "./home.module.scss";

//^ components
import SignUp from "@/components/SignUp/SignUp";

const Home: React.FC = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (session && session.user) {
      localStorage.setItem("token", session.user.email as string);

      router.replace("/gallery");
    }
  }, [session, router]);

  useEffect(() => {
    gsap.fromTo(".signup-card-div", { y: 1000 }, { y: 0, ease: "power4" });
  }, []);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        setIsLoading(false);
      } else {
        router.replace("/gallery");
      }
    });
  }, [router, session]);

  return (
    <div className={`signup-card-div home-div ${styles.page}`}>
      {status === "loading" || isLoading ? "Loading..." : <SignUp />}
    </div>
  );
};

export default Home;
