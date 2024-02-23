import { useEffect, useRef, useState, useCallback } from 'react'
import {
  makeStyles,
  shorthands,
  Button,
  Caption1,
  Body1,
  Subtitle1,
  Text,
  tokens,
  Title2,
  useModalAttributes,
  useFocusFinders
} from '@fluentui/react-components'
// import {
//   MoreHorizontal20Regular
// } from '@fluentui/react-icons'
import {
  Card,
  CardHeader,
  // CardPreview
} from '@fluentui/react-components'
import Title from '../components/Title'
import axios from 'axios'
import { DatePicker } from '@fluentui/react-datepicker-compat'
import { forSocket } from '../helpers/convertDate'
import { useNavigate } from 'react-router-dom'
import Services from '../services/timeEntry'
import { toLocalStorage } from '../helpers/toLocalStorage'
import { db } from '../models/db'
import { useLiveQuery } from "dexie-react-hooks";
import { insertActivity, insertOperator, insertUnit } from '../helpers/indexedDB/insert'
// import { decode } from "@msgpack/msgpack";
import msgpack from 'msgpack-lite';

// const resolveAsset = asset => {x
//   const ASSET_URL =
//     'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/'
//   return `${ASSET_URL}${asset}`
// }

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
  horizontalCardImage: {
    width: '50px',
    height: '50px',
    ...shorthands.padding('5px')
  },
  headerImage: {
    ...shorthands.borderRadius('4px'),
    maxWidth: '44px',
    maxHeight: '44px'
  },
  divider: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '20px'
  },
  dialog: {
    position: 'fixed',
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.inset(0),
    ...shorthands.padding('10px'),
    ...shorthands.margin('auto'),
    ...shorthands.borderStyle('none'),
    ...shorthands.overflow('unset'),
    boxShadow: tokens.shadow16,
    width: '450px',
    height: '200px',
    display: 'flex',
    flexDirection: 'column'
  },

  footer: {
    display: 'flex',
    marginTop: 'auto',
    justifyContent: 'end',
    ...shorthands.gap('5px')
  },
  control: {
    maxWidth: '300px'
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

const CardExample = props => {
  const styles = useStyles()

  const handlerClick = () => {
    props.navigate(`${props.link}`)
  }

  const handlerDate = date => {
    if (date) {
      date = new Date(date)

      const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      const result = date.toLocaleDateString('id-ID', options)

      return result
    } else {
      return null
    }
  }
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
      <p className={styles.text} style={{ marginLeft: '62px' }}>
        <Caption1 className={styles.caption}>
          {handlerDate(props.time)}
        </Caption1>
      </p>
    </Card>
  )
}

const dataFiles = [
  {
    name: 'Coal Hauling',
    desc: 'Data Collector for Coal Hauling Entry',
    link: '/coalhauling'
  },
  // {
  //   name: 'Coal Hauling Admin',
  //   desc: 'Data Collector for Coal Hauling Entry Admin',
  //   link: '/coalhauling-admin'
  // },
  {
    name: 'Time Entry',
    desc: 'List Time Entry All Date',
    link: '/time-entry-collector'
  },
  {
    name: 'Operator Timesheet Data Entry',
    desc: 'Data Collector for Activity Time Entry',
    link: '/time-entry/support'
  },
  {
    name: 'Production',
    desc: 'Data Collector for Production Records',
    link: '/production'
  },
  {
    name: 'Mine Plan',
    desc: 'Data Collector for Mine Planning Activity',
    link: '/mineplan'
  },
  {
    name: 'Time Sheet Mines/Protes',
    desc: 'Template Time Entry model Mines',
    link: '/time-sheet-fms'
  },
  {
    name: 'Distance Data Entry',
    desc: 'Template Data Entry for Distance',
    link: '/distance-data-entry'
  }
]

const DashboardPage = () => {
  const styles = useStyles()
  const navigate = useNavigate()
  const [dateFile, setDateFile] = useState()
  const [dataFile, setDataFile] = useState([])
  const [open, setOpen] = useState(false)
  const { findFirstFocusable } = useFocusFinders()
  const triggerRef = useRef(null)
  const dialogRef = useRef(null)

  const { triggerAttributes, modalAttributes } = useModalAttributes({
    trapFocus: true
  })

  const activity = useLiveQuery(() => db.activity.toArray());
  const operator = useLiveQuery(() => db.operator.toArray());
  const unit = useLiveQuery(() => db.unit.toArray());

  const getData = useCallback(async () => {
    let response = await axios.get(
      `${import.meta.env.VITE_LINK_BACKEND}/v1/getallfile`
    )
    console.log(response.data.data)
    setDataFile(response.data.data)
  }, [setDataFile])


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
    getData()
    if (open && dialogRef.current) {
      findFirstFocusable(dialogRef.current)?.focus()
    }
  }, [open, findFirstFocusable, getDataMaster, getData, activity, operator, unit])

  const onClickClose = () => {
    setOpen(false)
    triggerRef.current?.focus()
  }

  const onDialogKeydown = e => {
    if (e.key === 'Escape') {
      setOpen(false)
      triggerRef.current?.focus()
    }
  }

  const handleDate = date => {
    let dt = forSocket(date)
    setDateFile(dt)
  }

  const createFile = () => {
    navigate(`/collector/TimeEntry-${dateFile}-bcp`)
  }

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
          title='Entry Data by Template'
          description='All default template to collect data from operation activities as usual. This template act as input form.'
        />
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            gap: '20px',
            flexFlow: 'wrap',
            marginTop: '2em'
          }}
        >
          {dataFiles.map((v, i) => (
            <CardExample key={i} name={v.name} desc={v.desc} link={v.link} navigate={navigate} />
          ))}
          {open && (
            <div
              onKeyDown={onDialogKeydown}
              ref={dialogRef}
              aria-modal='true'
              role='dialog'
              className={styles.dialog}
              aria-label='Select Date'
            >
              <Title2 as='h2'>Select Date</Title2>
              <DatePicker
                className={styles.control}
                placeholder='Select a date...'
                onSelectDate={handleDate}
              />
              <div className={styles.footer}>
                <Button onClick={createFile}>Create</Button>
                <Button onClick={onClickClose}>Close</Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
