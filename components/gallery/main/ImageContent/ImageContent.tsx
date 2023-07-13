import React, { HTMLAttributes, useCallback, useEffect, useState } from "react";
import styles from "./ImageContent.module.scss";
import { Container } from "@mui/material";
import { topicObjData } from "../MainContent";
import CategoryTab from "../CategoryTab/CategoryTab";
import CategoryImages from "../CategoryImages/CategoryImages";

interface ImageContentProps extends HTMLAttributes<HTMLDivElement> {
  topics?: Array<topicObjData>;
}

const ImageContent = ({ topics, className }: ImageContentProps) => {
  const [category, setCategory] = useState<{ title?: string; id?: string }>({});
  const [imagesContent, setImagesContent] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [previousCategoryID, setPreviousCategoryID] = useState<
    string | undefined
  >(undefined);

  const getCategoryTabData = useCallback(
    (category: { title?: string; id?: string }) => {
      setCategory(category);
    },
    []
  );

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => {
      window.removeEventListener("scroll", handleInfiniteScroll);
    };
  }, []);

  const getCategoryImages = async () => {
    if (previousCategoryID !== category.id) {
      setImagesContent([]); // Empty the imagesContent
      setPreviousCategoryID(category.id);
    }

    const response = await fetch(
      `https://api.unsplash.com/topics/${
        category.id
      }/photos?client_id=${"nBxKGGR7wcXv3SD9UN3-PUapfJKrU8P17pnmIslhbV0"}&page=${page}`
    );

    if (!response.ok) {
      console.log(await response.json());
      return;
    }

    const resData = await response.json();
    setImagesContent((prevData) => [...prevData, ...resData]);
  };

  const getImages = async () => {
    const response = await fetch(
      `https://api.unsplash.com/photos?client_id=${"nBxKGGR7wcXv3SD9UN3-PUapfJKrU8P17pnmIslhbV0"}&page=${page}`
    );

    if (!response.ok) {
      console.log(await response.json());
      return;
    }

    const resData = await response.json();
    setImagesContent((prevData) => [...prevData, ...resData]);
  };

  useEffect(() => {
    if (Object.keys(category).length === 0) {
      getImages();
    }
  }, [category]);

  useEffect(() => {
    getCategoryImages();
  }, [category.id, page]); // Update the dependency array to only include category.id and page

  const images = imagesContent.map((image) => ({
    imageID: image.id as string,
    imageURL: image.urls?.regular as string,
  }));

  return (
    <section className={`${styles["image-content"]} ${className}`}>
      <Container>
        <CategoryTab topics={topics} onCategoryTab={getCategoryTabData} />
        <CategoryImages images={images} />
      </Container>
    </section>
  );
};

export default ImageContent;
