// import * as React from "react";
import {
  makeStyles,
//   shorthands,
  Tab,
  TabList,
} from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    // ...shorthands.padding("0px", "20px"),
    rowGap: "20px",
  },
});

export const TablistMenu = () => {
  const styles = useStyles();

  const renderTabs = () => {
    return (
      <>
        <Tab value="timeEntry" >Time Entry</Tab>
        <Tab value="distance">Distance</Tab>
        <Tab value="hmbd">HM & BD</Tab>
        <Tab value="prodMaster">Prod Master</Tab>
        <Tab value="summaryLoadByShift">Summary Load by Shift</Tab>
        <Tab value="weatherDelay">Weather Delay</Tab>
        <Tab value="reportPitControl">Report Pit Control</Tab>
        <Tab value="seamCoal">Seam Coal</Tab>
        <Tab value="loadingPoint">Loading Point</Tab>
        <Tab value="dumpingPoint">Dumping Point</Tab>
      </>
    );
  };

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue="timeEntry" size="small">
        {renderTabs()}
      </TabList>
    </div>
  );
};