import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";

//^ styles
import styles from "../../styles/pages/gallery/Gallery.module.scss";

//^ component
import Header from "../../components/Headers/Header";
import MainContent from "../../components/gallery/main/MainContent";

const Gallery = () => {
  //^ state
  const [sessionIsLoading, setSessionIsLoading] = useState(true);
  // const [loadedSession, setLoadedSession]: any = useState();

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
  }, [setSessionIsLoading]);

  return (
    <section className={styles["section"]}>
      {sessionIsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "100vh",
          }}
        >
          <p>"loading..."</p>
        </div>
      ) : (
        <>
          <Header />
          <MainContent />
        </>
      )}
    </section>
  );
};

export default Gallery;
