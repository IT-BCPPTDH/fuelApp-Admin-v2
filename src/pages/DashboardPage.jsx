import { useEffect, useCallback } from 'react'
import { makeStyles, shorthands, Divider, Caption1, Body1, Subtitle1, Text } from '@fluentui/react-components'
import { Card, CardHeader } from '@fluentui/react-components'
import Title from '../components/Title'
import { useNavigate } from 'react-router-dom'
import Services from '../services/timeEntry'
import { toLocalStorage } from '../helpers/toLocalStorage'
import { db } from '../models/db'
import { useLiveQuery } from "dexie-react-hooks";
import { insertActivity, insertOperator, insertUnit } from '../helpers/indexedDB/insert'
import msgpack from 'msgpack-lite';
import PropTypes from 'prop-types'
import { menuArrayData, formArrayData } from '../helpers/menuHelper'

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    columnGap: '16px',
    rowGap: '36px'
  },
  title: {
    ...shorthands.margin(0, 0)
  },
  description: {
    ...shorthands.margin(0, 0, '12px')
  },
  card: {
    width: '360px',
    maxWidth: '100%',
    height: 'fit-content'
  },
  text: {
    ...shorthands.margin(0)
  },
  divider: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '100px'
  }
})

const Header = ({ title, description }) => {
  const styles = useStyles()
  return (
    <>
      {title && (
        <Subtitle1 as='h4' block className={styles.title}>
          {title}
        </Subtitle1>
      )}

      {description && (
        <Body1 as='p' block className={styles.description}>
          {description}
        </Body1>
      )}
    </>
  )
}

const CardMenu = props => {
  const styles = useStyles()
  const navigate = useNavigate()

  const handlerClick = () => {
    navigate(`${props.link}`)
  }

  return (
    <Card className={styles.card} onClick={handlerClick}>
      <CardHeader
        header={<Text weight='semibold'>{props.name}</Text>}
        description={
          <Caption1 className={styles.caption}>{props.desc}</Caption1>
        }
      />
    </Card>
  )
}

const DashboardPage = () => {
  const styles = useStyles()
  const activity = useLiveQuery(() => db.activity.toArray());
  const operator = useLiveQuery(() => db.operator.toArray());
  const unit = useLiveQuery(() => db.unit.toArray());

  const getDataMaster = useCallback(async (activity, operator, unit) => {
    try {
      const [dataMasterActivity, dataMasterOp, dataMasterUnit] = await Promise.all([
        Services.getMasterActivity(),
        Services.getMasterTimeEntryOperator(),
        Services.getMasterTimeEntryUnit(),
      ]);

      const decodedDataActivity = msgpack.decode(dataMasterActivity);
      const decodeDataOperator = msgpack.decode(dataMasterOp)
      const decodeDataUnit = msgpack.decode(dataMasterUnit)

      if (
        unit?.length !== undefined &&
        decodeDataUnit.totalRow !== unit?.length
      ) {
        db.activity.clear();
        insertUnit(decodeDataUnit.data);
      }

      if (
        activity?.length !== undefined &&
        decodedDataActivity.totalRow !== activity?.length
      ) {
        db.activity.clear();
        insertActivity(decodedDataActivity.data);
      }

      if (
        operator?.length !== undefined &&
        decodeDataOperator.totalRow !== operator?.length
      ) {
        db.operator.clear();
        insertOperator(decodeDataOperator.data);
      }

      const act = decodedDataActivity?.data?.map((v) => v.activityname);
      const op = decodeDataOperator?.data?.map((v) => v.jde);
      const unt = decodeDataUnit?.data?.map((v) => v.unitno);


      toLocalStorage('timeEntry-unit', unt);
      toLocalStorage('timeEntry-activity', act);
      toLocalStorage('timeEntry-masterAct', decodedDataActivity.data);
      toLocalStorage('timeEntry-operator', op);

    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    document.title = 'Homepage Production Data Collector - PTDH'
    if (activity && operator && unit) {
      getDataMaster(activity, operator, unit)
    }
  }, [ getDataMaster, activity, operator, unit])

  return (
    <div className={styles.main}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Title title='Homepage' />
      </div>

      <section>
        <Header
          title='All Data Collection'
          description='Navigate through the menu link to access a comprehensive overview of all recorded production data collections.'
        />
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            gap: '15px',
            flexFlow: 'wrap',
            marginTop: '2em'
          }}
        >
          {menuArrayData.map((v, i) => (
            <CardMenu key={i} name={v.name} desc={v.desc} link={v.link} />
          ))}
        </div>
        <div className={styles.divider}>
          <Divider>***********</Divider>
        </div>
        <Header
          title='Data Collector Form Menu'
          description='A standardized form for gathering operational activity data, serving as the primary input template for recording routine tasks and events.'
        />
           <div
          style={{
            display: 'flex',
            alignContent: 'center',
            gap: '15px',
            flexFlow: 'wrap',
            marginTop: '2em'
          }}
        >
          {formArrayData.map((v, i) => (
            <CardMenu key={i} name={v.name} desc={v.desc} link={v.link} />
          ))}
          </div>
      </section>
    </div>
  )
}

export default DashboardPage

Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

CardMenu.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
  time: PropTypes.any,
  link: PropTypes.string
}