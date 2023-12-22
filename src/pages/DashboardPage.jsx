import { useEffect } from 'react'
import {
  makeStyles,
  shorthands,
  Button,
  Caption1,
  Body1,
  Subtitle1,
  Text,
  Divider,
  tokens
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

  return (
    <Card className={styles.card} orientation='horizontal'>
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

const dataFilesSample = [
  {
    name: 'Time Entry 20 Desember 2023',
    desc: 'Data Time Entry by Pit Control',
    link: '/collector/time-entry'
  },
  {
    name: 'Production 21 Desember 2023',
    desc: 'Data Collector for Production Records',
    link: '/collector/production'
  },
  {
    name: 'Mine Plan 20 Desember 2023',
    desc: 'Data Collector for Mine Planning Activity',
    link: '/collector/mine-plan'
  },
  {
    name: 'Time Entry 21 Desember 2023',
    desc: 'Data Time Entry by Pit Control',
    link: '/collector/time-entry'
  },
  {
    name: 'Production 20 Desember 2023',
    desc: 'Data Collector for Production Records',
    link: '/collector/production'
  },
  {
    name: 'Mine Plan 21 Desember 2023',
    desc: 'Data Collector for Mine Planning Activity',
    link: '/collector/mine-plan'
  }
]

const DashboardPage = () => {
  const styles = useStyles()

  useEffect(() => {
    document.title = 'Homepage Data Collection - PTDH'
  }, [])

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
          {dataFilesSample.map((v, i) => (
            <CardExample key={i} name={v.name} desc={v.desc} link={v.link} />
          ))}
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
            <CardExample key={i} name={v.name} desc={v.desc} link={v.link} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
