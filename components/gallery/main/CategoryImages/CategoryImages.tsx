import React, { Fragment, HTMLAttributes } from "react";
import Image from "next/image";

//^ style module
import styles from "./CategoryImages.module.scss";

import sunflower from "../../../../assets/sunflowe.jpg";

//^ components
import SecondaryCard from "../../../Cards/SecondaryCard/SecondaryCard";
import UnLike from "../../../Icons/UnLike";
import Like from "../../../Icons/Like";

interface CategoryImgProps extends HTMLAttributes<HTMLDivElement> {
  images?: any;
}

const CategoryImages = ({ className, images }: CategoryImgProps) => {
  return (
    <section className={`${styles["section"]} ${className}`}>
      {(images as any)?.map((image: any, index: any) => {
        const imageLoader = () => {
          return image.imageURL;
        };
        return (
          <Fragment key={index}>
            <SecondaryCard>
              <Image
                loader={imageLoader}
                src={sunflower}
                width={620}
                height={201}
                alt="demo image"
                priority
                className={styles["image"]}
                placeholder="blur"
              />
              <div className={styles["like-section"]}>
                <UnLike /> UNLIKE
              </div>
            </SecondaryCard>
          </Fragment>
        );
      })}
    </section>
  );
};

export default CategoryImages;
