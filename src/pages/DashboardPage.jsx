import { useEffect, useRef, useState } from 'react'
import {
  makeStyles,
  shorthands,
  Button,
  Caption1,
  Body1,
  Subtitle1,
  Text,
  Divider,
  tokens,
  Title2,
  useModalAttributes,
  useFocusFinders
} from '@fluentui/react-components'
import {
  MoreHorizontal20Regular,
  Open16Regular,
  Share16Regular
} from '@fluentui/react-icons'
import {
  Card,
  CardHeader,
  CardFooter,
  CardPreview
} from '@fluentui/react-components'
import Title from '../components/Title'
import axios from 'axios'
import { DatePicker } from '@fluentui/react-datepicker-compat'
import { forSocket } from '../helpers/convertDate'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const resolveAsset = asset => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/'
  return `${ASSET_URL}${asset}`
}

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    columnGap: '16px',
    rowGap: '36px'
  },
  title: {
    ...shorthands.margin(0, 0, '12px')
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
    // backgroundColor: tokens.colorNeutralBackground1,
  },
  dialog: {
    position: "fixed",
    backgroundColor: tokens.colorNeutralBackground1,
    ...shorthands.inset(0),
    ...shorthands.padding("10px"),
    ...shorthands.margin("auto"),
    ...shorthands.borderStyle("none"),
    ...shorthands.overflow("unset"),
    boxShadow: tokens.shadow16,
    width: "450px",
    height: "200px",
    display: "flex",
    flexDirection: "column",
  },

  footer: {
    display: "flex",
    marginTop: "auto",
    justifyContent: "end",
    ...shorthands.gap("5px"),
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

  const handlerClick = () =>{
    props.navigate(`${props.link}`)
  }

  return (
    <Card className={styles.card} orientation='horizontal' onClick={handlerClick}>
      <CardPreview className={styles.horizontalCardImage}>
        <img
          className={styles.horizontalCardImage}
          src={resolveAsset('xlsx.png')}
          alt={props.name}
        />
      </CardPreview>

      <CardHeader
        header={<Text weight='semibold'>{props.name}</Text>}
        description={
          <Caption1 className={styles.caption}>{props.desc}</Caption1>
        }
        action={
          <Button
            appearance='transparent'
            icon={<MoreHorizontal20Regular />}
            aria-label='More options'
          />
        }
      />
    </Card>
  )
}

const dataFiles = [
  {
    name: 'Time Entry',
    desc: 'Data Collector for Activity Time Entry',
    link: '/collector/time-entry'
  },
  {
    name: 'Production',
    desc: 'Data Collector for Production Records',
    link: '/collector/production'
  },
  {
    name: 'Mine Plan',
    desc: 'Data Collector for Mine Planning Activity',
    link: '/collector/mine-plan'
  }
]


const DashboardPage = () => {
  const styles = useStyles()
  const navigate = useNavigate();

  const [dateFile, setDateFile] = useState()
  const [dataFile, setDataFile] = useState([])
  const [open, setOpen] = useState(false);
  const { triggerAttributes, modalAttributes } = useModalAttributes({
    trapFocus: true,
  });
  const { findFirstFocusable } = useFocusFinders();
  const triggerRef = useRef(null);
  const dialogRef = useRef(null);

  const getData = async () =>{
    let response = await axios.get(`${import.meta.env.VITE_LINK_BACKEND}/v1/getallfile`)
    setDataFile(response.data.data)
  }

  useEffect(() => {
    document.title = 'Homepage Data Collection - PTDH'
    getData()
    if (open && dialogRef.current) {
      findFirstFocusable(dialogRef.current)?.focus();
    }
  }, [open,findFirstFocusable])


  const onClickTrigger = () => {
    setOpen(true);
  };

  const onClickClose = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onDialogKeydown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleDate = (date) =>{
    let dt = forSocket(date)
    setDateFile(dt)
  }

  const createFile = () =>{
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
        <Title title='Data Collection' />
        
      </div>
      <section>
        <Header
          title='Latest Updates'
          description='Latest form has been updated by you,'
        />
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            gap: '20px',
            flexFlow: 'wrap'
          }}
        >
          {/* {dataFilesSample.map((v, i) => (
            <CardExample key={i} name={v.name} desc={v.desc} link={v.link} />
          ))} */}
          {
          dataFile?(
            <>
            <Button ref={triggerRef} {...triggerAttributes} onClick={onClickTrigger} style={{width: '100px',maxWidth: '100%',height: '55px'}} className={styles.signInButton}>
                  +
            </Button>  
            {
              dataFile?.map((v, i) => (
                <CardExample key={i} name={v.key}  link={`/collector/${v.key}`} desc={`last updated by ${v.updated_at}`} navigate={navigate}/>
              ))
            }
            </>
            ):(
              <>
                <Button ref={triggerRef} {...triggerAttributes} onClick={onClickTrigger} style={{width: '100px',maxWidth: '100%',height: '55px'}} className={styles.signInButton}>
                  +
                </Button>  
              </>  
              )
            }
        </div>
      </section>
      <div className={styles.divider}>
        <Divider inset />
      </div>
      <section>
        <Header
          title='Templates'
          description='All default template to collect data from operation activities as usual. This template act as input form.'
        />
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            gap: '20px',
            flexFlow: 'wrap'
          }}
        >
          {dataFiles.map((v, i) => (
            <CardExample key={i} name={v.name} desc={v.desc} />
          ))}
      {open &&(
          <div
            onKeyDown={onDialogKeydown}
            ref={dialogRef}
            aria-modal="true"
            role="dialog"
            className={styles.dialog}
            aria-label="Select Date"
          >
            <Title2 as="h2">Select Date</Title2>
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
      )
    }
    </div>
      </section>
    </div>
  )
}

export default DashboardPage
