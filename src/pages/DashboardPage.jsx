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
  // horizontalCardImage: {
  //   width: '50px',
  //   height: '50px',
  //   ...shorthands.padding('5px')
  // },
  // headerImage: {
  //   ...shorthands.borderRadius('4px'),
  //   maxWidth: '44px',
  //   maxHeight: '44px'
  // },
  divider: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '100px'
  },

  // dialog: {
  //   position: 'fixed',
  //   backgroundColor: tokens.colorNeutralBackground1,
  //   ...shorthands.inset(0),
  //   ...shorthands.padding('10px'),
  //   ...shorthands.margin('auto'),
  //   ...shorthands.borderStyle('none'),
  //   ...shorthands.overflow('unset'),
  //   boxShadow: tokens.shadow16,
  //   width: '450px',
  //   height: '200px',
  //   display: 'flex',
  //   flexDirection: 'column'
  // },

  // footer: {
  //   display: 'flex',
  //   marginTop: 'auto',
  //   justifyContent: 'end',
  //   ...shorthands.gap('5px')
  // },
  // control: {
  //   maxWidth: '300px'
  // }
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

Header.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

const CardMenu = props => {
  const styles = useStyles()
  const navigate = useNavigate()

  const handlerClick = () => {
    navigate(`${props.link}`)
  }

  // const handlerDate = date => {
  //   if (date) {
  //     date = new Date(date)

  //     const options = {
  //       day: 'numeric',
  //       month: 'long',
  //       year: 'numeric',
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       second: '2-digit'
  //     }
  //     const result = date.toLocaleDateString('id-ID', options)

  //     return result
  //   } else {
  //     return null
  //   }
  // }

  return (
    <Card className={styles.card} onClick={handlerClick}>
      {/* <CardPreview className={styles.horizontalCardImage}>
        <img
          className={styles.horizontalCardImage}
          src={resolveAsset('xlsx.png')}
          alt={props.name}
        />
      </CardPreview> */}

      <CardHeader
        // image={
        //   <img
        //     className={styles.horizontalCardImage}
        //     src={resolveAsset('xlsx.png')}
        //     alt={props.name}
        //   />
        // }
        header={<Text weight='semibold'>{props.name}</Text>}
        description={
          <Caption1 className={styles.caption}>{props.desc}</Caption1>
        }
      // action={
      //   <Button
      //     appearance='transparent'
      //     icon={<MoreHorizontal20Regular />}
      //     aria-label='More options'
      //   />
      // }
      />
      {/* <p className={styles.text} style={{ marginLeft: '62px' }}>
        <Caption1 className={styles.caption}>
          {handlerDate(props.time)}
        </Caption1>
      </p> */}
    </Card>
  )
}

CardMenu.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
  time: PropTypes.any,
  link: PropTypes.string
}

const menuArrayData = [
  {
    name: 'Data Coal Hauling',
    desc: 'Data Collector for Coal Hauling Entry',
    link: '/coalhauling'
  },
  // {
  //   name: 'Coal Hauling Admin',
  //   desc: 'Data Collector for Coal Hauling Entry Admin',
  //   link: '/coalhauling-admin'
  // },
  {
    name: 'Data Time Entry',
    desc: 'List Time Entry All Date',
    link: '/time-entry-from-collector'
  },
  {
    name: 'Data Time Entry (FMS)',
    desc: 'Template Time Entry model Mines',
    link: '/time-sheet-fms'
  },
  {
    name: 'Data Production',
    desc: 'Data Collector for Production Records',
    link: '/production'
  },
  {
    name: 'Data Mine Plan',
    desc: 'Data Collector for Mine Planning Activity',
    link: '/mineplan'
  },

  {
    name: 'Data Distance',
    desc: 'Template Data Entry for Distance',
    link: '/distance-data-entry'
  }
]

const formArrayData = [
  {
    name: 'Form Coal Hauling',
    desc: 'Data Collector Coal Hauling',
    link: '/coalhauling-dataentry-form'
  },
  {
    name: 'Form Time Entry - Unit Support',
    desc: 'Data Collector Time Entry for Unit Support',
    link: '/time-entry-support-form'
  },
  {
    name: 'Form Time Entry - Unit Digger',
    desc: 'Data Collector Time Entry for Unit Digger',
    link: '/time-entry-digger-form'
  },
  {
    name: 'Form Time Entry - Unit Hauler',
    desc: 'Data Collector Time Entry for Unit Hauler',
    link: '/time-entry-hauler-form'
  }
]

const DashboardPage = () => {
  const styles = useStyles()

  // const [dataFile, setDataFile] = useState([])

  const activity = useLiveQuery(() => db.activity.toArray());
  const operator = useLiveQuery(() => db.operator.toArray());
  const unit = useLiveQuery(() => db.unit.toArray());

  // const getData = useCallback(async () => {
  //   let response = await axios.get(
  //     `${import.meta.env.VITE_LINK_BACKEND}/v1/getallfile`
  //   )
  //   // console.log(response.data.data)
  //   setDataFile(response.data.data)
  // }, [setDataFile])


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
    document.title = 'Homepage MED/MOD Data Entry App - PTDH'
    if (activity && operator && unit) {
      getDataMaster(activity, operator, unit)
    }
    // getData()

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
