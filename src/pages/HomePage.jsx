import { useState, useEffect } from 'react'
import { makeStyles, tokens, Field, Spinner } from '@fluentui/react-components'
import Title from '../components/Title'
import ExcelLike from '../components/ExcelLike'
import { DatePicker } from '@fluentui/react-datepicker-compat'
import { socket } from '../socket'

const useStyles = makeStyles({
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '20px',
    backgroundColor: tokens.colorNeutralBackground1
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  },
  control: {
    maxWidth: '300px'
  }
})

export const HomePage = () => {
  const styles = useStyles()

  const [isConnected, setIsConnected] = useState(socket.connected)

  const [dataXls, setDataXls] = useState()

  useEffect(() => {
    function onConnect () {
      setIsConnected(true)
    }

    function onDisconnect () {
      setIsConnected(false)
    }

    function onFooEvent (value) {
      // console.log(value)
      setDataXls(JSON.parse(value))
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('update', onFooEvent)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('update', onFooEvent)
    }
  }, [])

  useEffect(() => {
    socket.emit('getData', 'TimeEntry-20231221-bcp', e => {
      console.log(e)
    })
  }, [])

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Title title='Time Entry 19 December 2023, Site: BCP' />
        <Field label='Select a date'>
          <DatePicker
            className={styles.control}
            placeholder='Select a date...'
            // {...props}
          />
        </Field>
      </div>

      <div className={styles.example}>{/* <Divider /> */}</div>
      <div className={styles.tableContainer}>
      {dataXls ? 
        <ExcelLike dataXls={dataXls} setDataXls={setDataXls}/> :
        <Spinner size="small" label="Please wait while loading all data..." />
      }
      </div>
    </>
  )
}
