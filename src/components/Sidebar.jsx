import {
  Home24Regular,
  Feed24Regular,
  Open24Regular,
} from '@fluentui/react-icons';
import {
  makeStyles,
  shorthands,
  Tab,
  TabList,
  Image,
} from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';
import Elipse from '../images/Ellipse.png';
import Cookies from 'js-cookie';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ...shorthands.padding('20px', '5px'),
    backgroundColor: '#f4f5ed',
    minWidth: '75px',
  },
  tabStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
});

const Sidebar = () => {
  const styles = useStyles();
  const navigate = useNavigate();

  const handleTabClick = (route) => {
    navigate(route);
  };

  const handleLogout = () => {
    deleteAllCookies();
    navigate('/');
    window.location.reload();
  };

  const deleteAllCookies = () => {
    const cookieNames = Cookies.get();

    for (const cookieName in cookieNames) {
      Cookies.remove(cookieName);
    }

    localStorage.clear();
  };

  const tabData = [
    { value: 'tab1', icon: <Home24Regular />, label: 'Home', onClick: () => handleTabClick('/') },
    { value: 'tab2', icon: <Feed24Regular />, label: 'Report', onClick: () => handleTabClick('/data-master') },
    { value: 'tab3', icon: <Open24Regular />, label: 'Logout', onClick: handleLogout },
  ];

  return (
    <div className={styles.root} style={{ borderRight: '1px solid #cfcfcf', borderTop: '1px solid #c8c8c8' }}>
      <div>
        <Image alt="Darma Henwa" shape="circular" src={Elipse} height={16} width={16} />
      </div>

      <TabList defaultSelectedValue={tabData[0].value} vertical color='seafoam' style={{ marginTop: '1em' }}>
        {tabData.map((tab) => (
          <Tab key={tab.value} value={tab.value} style={{ marginBottom: '10px' }} onClick={tab.onClick}>
            <div className={styles.tabStyle}>
              {tab.icon}
              <small>{tab.label}</small>
            </div>
          </Tab>
        ))}
      </TabList>
    </div>
  );
};

export default Sidebar;
