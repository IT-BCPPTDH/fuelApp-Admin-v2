import { makeStyles, Tab, TabList } from "@fluentui/react-components";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'

const useStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    rowGap: "20px",
  },
});

export const DynamicTablistMenu = ({ tabs, active, handleTab }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const handleTabChange = (value) => {
    navigate(`/${value}`);
    handleTab()
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
      <TabList defaultSelectedValue={active} size="small">
        {renderTabs()}
      </TabList>
    </div>
  );
};

DynamicTablistMenu.propTypes = {
  tabs: PropTypes.array,
  active: PropTypes.string,
  handleTab: PropTypes.func
}