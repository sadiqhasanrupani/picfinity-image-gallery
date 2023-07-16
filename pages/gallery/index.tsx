import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//^ styles
import styles from "../../styles/pages/gallery/Gallery.module.scss";

//^ component
import Header from "../../components/Headers/Header";
import MainContent from "../../components/gallery/main/MainContent";

//^ client-auth
import { getAccessToken } from "@/lib/auth/client-auth";

const Gallery = () => {
  //^ state
  const [sessionIsLoading, setSessionIsLoading] = useState(true);

  //^ next route
  const router = useRouter();

  const token = getAccessToken();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      setSessionIsLoading(false);
    }
  }, []);

  return (
    <section className={styles["section"]}>
      {sessionIsLoading ? (
        <div className={styles["loading"]}>
          <p>Loading...</p>
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
