import React, { HTMLAttributes } from "react";

import styles from "./SearchBar.module.scss";

import SearchIcon from "../Icons/SearchIcon";

interface SearchProps extends HTMLAttributes<HTMLDivElement> {
  ref?: any;
}

const SearchBar = ({ ref, className, onChange, onBlur }: SearchProps) => {
  return (
    <div className={`${styles["search-input"]} ${className}`}>
      <input
        ref={ref}
        type="search"
        className={`${styles.searchBar}`}
        placeholder="Search"
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className={styles["search-icon"]}>
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchBar;
