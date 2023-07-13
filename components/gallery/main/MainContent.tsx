import React, { useEffect, useState } from "react";

import styles from "./MainContent.module.scss";

//^ component
import SearchBar from "../../SearchBar/SearchBar";
import ImageContent from "./ImageContent/ImageContent";

export interface topicObjData {
  id?: string;
  title?: string;
}

const MainContent = () => {
  //^ use states
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch(
        `https://api.unsplash.com/topics?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
      );

      if (!response.ok) {
        console.log(await response.json());
        return;
      }

      const resData = await response.json();
      setTopics(resData);
    };

    getCategories();
  }, []);

  const categories = topics.map((topic: topicObjData) => {
    return { id: topic.id, title: topic.title };
  });

  return (
    <main className={styles["main"]}>
      <div className={styles["search-bar-div"]}>
        {/* <SearchBar className={styles["search-bar"]} /> */}
      </div>
      <div className={styles["main-content"]}>
        <ImageContent topics={categories} />
      </div>
    </main>
  );
};

export default MainContent;
