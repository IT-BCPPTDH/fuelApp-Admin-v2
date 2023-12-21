import { Home24Regular, Feed24Regular,Open24Regular } from '@fluentui/react-icons'
import {
  makeStyles,
  shorthands,
  Tab,
  TabList,
  // Avatar,
  Image
} from '@fluentui/react-components'
import Elipse from '../images/Ellipse.png'

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    ...shorthands.padding('20px', '5px'),
    backgroundColor: '#f4f5ed',
    minWidth: '75px'
  },
  tabStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})


const Sidebar = () => {
  const styles = useStyles()

  return (
    <div className={styles.root} style={{borderRight: '1px solid #cfcfcf'}}>
      <div>
      <Image
      alt="Darma Henwa"
      shape="circular"
      src={Elipse}
      height={16}
      width={16}
    />
      </div>
       
      <TabList defaultSelectedValue='tab2' vertical color="seafoam" style={{marginTop: '1em'}} >
        <Tab value='tab1' style={{marginBottom: '10px'}}>
          <div className={styles.tabStyle}>
            <Home24Regular />
            <small>Home</small>
            
          </div>
        </Tab>
        <Tab value='tab2' style={{marginBottom: '10px'}}>
          <div className={styles.tabStyle}>
            <Feed24Regular />
            <small>Report</small>
            
          </div>
        </Tab>
        <Tab value='tab3' style={{marginBottom: '10px'}}>
        <div className={styles.tabStyle}>
            <Open24Regular />
            <small>Logout</small>
            
          </div>
        </Tab>
        
      </TabList>
    </div>
  )
}

export default Sidebar
