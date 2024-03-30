import { useEffect, useCallback, useContext } from 'react';
import { makeStyles, shorthands, Divider, Caption1, Body1, Subtitle1, Text, Card, CardHeader } from '@fluentui/react-components';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';
import Services from '../services/timeEntry';
import { toLocalStorage } from '../helpers/toLocalStorage';
import { db } from '../models/db';
// import { useLiveQuery } from 'dexie-react-hooks';
import { insertActivity, insertOperator, insertUnit } from '../helpers/indexedDB/insert';
import msgpack from 'msgpack-lite';
import PropTypes from 'prop-types';
import { menuArrayData, formArrayData } from '../helpers/menuHelper';
import UserRoleContext from '../context/UserRoleContext';
import { HeaderTitle } from '../utils/Wording';
import { getActivity, getOperator, getUnits } from '../helpers/indexedDB/getData';

// Constants for localStorage keys
const TIME_ENTRY_UNIT_KEY = 'timeEntry-unit';
const TIME_ENTRY_ACTIVITY_KEY = 'timeEntry-activity';
const TIME_ENTRY_MASTER_ACT_KEY = 'timeEntry-masterAct';
const TIME_ENTRY_OPERATOR_KEY = 'timeEntry-operator';

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    columnGap: '16px',
    rowGap: '36px',
  },
  title: {
    ...shorthands.margin(0, 0),
  },
  description: {
    ...shorthands.margin(0, 0, '12px'),
  },
  card: {
    width: '280px',
    maxWidth: '100%',
    height: 'fit-content',
  },
  text: {
    ...shorthands.margin(0),
  },
  divider: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '100px',
  },
});

const Header = ({ title, description }) => {
  const styles = useStyles();

  return (
    <>
      {title && (
        <Subtitle1 as="h4" block className={styles.title}>
          {title}
        </Subtitle1>
      )}

      {description && (
        <Body1 as="p" block className={styles.description}>
          {description}
        </Body1>
      )}
    </>
  );
};

const CardMenu = ({ name, desc, link }) => {
  const styles = useStyles();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    
    <Card className={styles.card} onClick={handleClick}>
      <CardHeader
        header={<Text weight="semibold">{name}</Text>}
        description={<Caption1 className={styles.caption}>{desc}</Caption1>}
      />
    </Card>
  );
};

const DashboardPage = () => {
  const styles = useStyles();

  const {userRole} = useContext(UserRoleContext)

  const getDataMaster = useCallback(async () => {
    try {

      const activity = await getActivity()
      const operator = await getOperator()
      const unit = await getUnits()

      let dataActivities = null
      let allActivities = null
      let dataOperators = null
      let dataUnits = null

      if(activity && operator && unit){
        allActivities = activity

        dataActivities = activity?.map((v) => v.activityname) || [];
        dataOperators= operator?.map((v) => v.jde) || [];
        dataUnits = unit?.map((v) => v.unitno) || [];
        
      } else {
        const [
          dataMasterActivity,
          dataMasterOp,
          dataMasterUnit,
        ] = await Promise.all([
          Services.getMasterActivity(),
          Services.getMasterTimeEntryOperator(),
          Services.getMasterTimeEntryUnit(),
        ]);

        const decodedDataActivity = msgpack.decode(dataMasterActivity);
        const decodeDataOperator = msgpack.decode(dataMasterOp);
        const decodeDataUnit = msgpack.decode(dataMasterUnit);

        const unitLength = unit?.length || 0;
        const activityLength = activity?.length || 0;
        const operatorLength = operator?.length || 0;

        if (unitLength !== undefined && decodeDataUnit.totalRow !== unitLength) {
          db.unit.clear();
          insertUnit(decodeDataUnit.data);
        }
  
        if (
          activityLength !== undefined &&
          decodedDataActivity.totalRow !== activityLength
        ) {
          db.activity.clear();
          insertActivity(decodedDataActivity.data);
        }
  
        if (
          operatorLength !== undefined &&
          decodeDataOperator.totalRow !== operatorLength
        ) {
          db.operator.clear();
          insertOperator(decodeDataOperator.data);
        }

        dataActivities = decodedDataActivity?.data?.map((v) => v.activityname) || [];
        dataOperators= decodeDataOperator?.data?.map((v) => v.jde) || [];
        dataUnits = decodeDataUnit?.data?.map((v) => v.unitno) || [];
        allActivities = decodeDataOperator?.data
      }

      toLocalStorage(TIME_ENTRY_UNIT_KEY, dataUnits);
      toLocalStorage(TIME_ENTRY_ACTIVITY_KEY, dataActivities);
      toLocalStorage(TIME_ENTRY_MASTER_ACT_KEY, allActivities);
      toLocalStorage(TIME_ENTRY_OPERATOR_KEY, dataOperators);
      
    } catch (err) {
      console.log(err);
    }
    
  }, []);

  useEffect(() => {
    document.title = userRole.role === 'MHA' ? HeaderTitle.DASH_TOP_MHA : 'Homepage Data Collector - PTDH';
      getDataMaster();
  }, [getDataMaster, userRole]);

  return (
    <div className={styles.main}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title title="Homepage" />
      </div>

      <section>
        <Header
          title={userRole.role === 'MHA' ? HeaderTitle.DASH_TOP_MHA : HeaderTitle.DASH_TOP_DH}
          description="Navigate through the menu link to access a comprehensive overview of all recorded production data collections."
        />
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            gap: '15px',
            flexFlow: 'wrap',
            marginTop: '2em',
          }}
        >
          
          {menuArrayData.map((v, i) => (
            v.access.includes(userRole.role) && (
              <CardMenu key={i} name={v.name} desc={v.desc} link={v.link}/>
            )
          ))}
        </div>
        <div className={styles.divider}>
          <Divider>***********</Divider>
        </div>
        <Header
          title="Data Collector Form Menu"
          description="A standardized form for gathering operational activity data, serving as the primary input template for recording routine tasks and events."
        />
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            gap: '15px',
            flexFlow: 'wrap',
            marginTop: '2em',
          }}
        >
          {formArrayData.map((v, i) => (
              v.access.includes(userRole.role) && (
                <CardMenu key={i} name={v.name} desc={v.desc} link={v.link}/>
              )
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;

Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

CardMenu.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
  time: PropTypes.any,
  link: PropTypes.string,
};
