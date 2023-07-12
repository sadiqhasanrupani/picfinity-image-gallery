import { useEffect, useState } from "react";
import { getSession, signOut, useSession } from "next-auth/client";

//^ styles
import styles from "../../styles/pages/gallery/Gallery.module.scss";

//^ component
import Header from "../../components/Headers/Header";

const Gallery = () => {
  //^ state
  const [sessionIsLoading, setSessionIsLoading] = useState(true);
  const [loadedSession, setLoadedSession]: any = useState();

  const [session, loading] = useSession();

  console.log(session);

  const signOutHandler = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  useEffect(() => {
    const getSessionHandler = async () => {
      const session = await getSession();

      if (!session) {
        window.location.href = "/login";
      } else {
        setSessionIsLoading(false);
      }
    };

    getSessionHandler();
  }, []);

  return (
    <section className={styles["section"]}>
      {sessionIsLoading ? "loading..." : <Header />}
    </section>
  );
};

export default Gallery;
