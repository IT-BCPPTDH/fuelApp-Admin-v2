// import React from "react";
import { makeStyles, Tab, TabList } from "@fluentui/react-components";
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: "20px",
  },
});

export const DynamicTablistMenu = ({ tabs }) => {
  const styles = useStyles();
  const navigate = useNavigate();

  const handleTabChange = (value) => {
    navigate(`/${value}`);
  };

  const renderTabs = () => {
    return tabs.map((tab) => (
      <Tab key={tab.value} value={tab.value} onClick={() => handleTabChange(tab.value)}>
        {tab.label}
      </Tab>
    ));
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue={tabs[0].value} size="small">
        {renderTabs()}
      </TabList>
    </div>
  );
};