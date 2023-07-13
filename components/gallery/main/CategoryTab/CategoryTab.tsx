import { HTMLAttributes, useState } from "react";

//^ style module
import styles from "./CategoryTab.module.scss"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { topicObjData } from "../MainContent";

interface CategoryTabProps extends HTMLAttributes<HTMLDivElement> {
  topics?: Array<topicObjData>;
  onCategoryTab?: any;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#7958fd", // Purple color
    },
  },
});

const CategoryTab = ({
  topics,
  className,
  onCategoryTab,
}: CategoryTabProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleTabClick = (category: { title: string; id: string }) => {
    if (onCategoryTab) {
      onCategoryTab(category);
    }
  };

  return (
    <div className={styles["category-tab"]}>
      <Box
        sx={{ padding: "1rem", bgcolor: "background.paper" }}
        className={styles["box"]}
      >
        <ThemeProvider theme={theme}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            className={`${styles["tabs"]} ${className}`}
          >
            {topics?.map((topic) => (
              <Tab
                key={topic.id}
                label={topic.title}
                onClick={() =>
                  handleTabClick({
                    title: topic.title as string,
                    id: topic.id as string,
                  })
                }
                className={styles['tab']}
              />
            ))}
          </Tabs>
        </ThemeProvider>
      </Box>
    </div>
  );
};

export default CategoryTab;
