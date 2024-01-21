import { useState, useEffect } from 'react';
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  Divider,
  makeStyles,
  tokens,
  Field
} from '@fluentui/react-components'

import Title from '../components/Title'
import { timeEntry } from '../data/time-entry'
import { getData } from "../data/spreadsheet";

import { TablistMenu } from '../components/Tablist';
import ExcelLike from '../components/ExcelLike';
import { DatePicker } from "@fluentui/react-datepicker-compat";
import { socket } from '../socket';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px'
  },
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
    maxWidth: "300px",
  },
})


// const columns = [
//   { columnKey: 'unitNo', label: 'Unit No.' },
//   { columnKey: 'productModel', label: 'Product Model' },
//   { columnKey: 'description', label: 'Description' },
//   { columnKey: 'owner', label: 'Owner' },
//   { columnKey: 'productionDate', label: 'Production Date' },
//   { columnKey: 'shift', label: 'Shift' },
//   { columnKey: 'operatorId', label: 'Operator ID' },
//   { columnKey: 'operatorName', label: 'Operator Name' },
//   { columnKey: 'smuStart', label: 'SMU Start' },
//   { columnKey: 'smuFinish', label: 'SMU Finish' },
//   { columnKey: 'hm', label: 'HM' },
//   { columnKey: 'activity', label: 'Activity' },
//   { columnKey: 'startTime', label: 'Start Time' },
//   { columnKey: 'endTime', label: 'End Time' },
//   { columnKey: 'duration', label: 'Duration' },
//   { columnKey: 'convertDuration', label: 'Convert Duration' },
//   { columnKey: 'bdNumber', label: 'BD Number' },
//   { columnKey: 'fromEquipment', label: 'From Equipment' },
//   { columnKey: 'material', label: 'Material' },
//   { columnKey: 'matGroup', label: 'Mat Group' },
//   { columnKey: 'distance', label: 'DISTANCE' },
//   { columnKey: 'loadingLocation', label: 'Loading Location' },
//   { columnKey: 'dumpingLocation', label: 'Dumping Location' },
//   { columnKey: 'trip', label: 'Trip' },
//   { columnKey: 'bcm', label: 'BCM' },
//   { columnKey: 'notes', label: 'Notes' },
//   { columnKey: 'cutOffStatus', label: 'Cut Off Status' },
//   { columnKey: 'loc', label: 'LOC' }
// ]

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
    console.log(isConnected)
    socket.emit('getData', 'TimeEntry-20231221-bcp', e => {
      console.log(e)
    })
  }, [isConnected])


  return (
    <>
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
    <Title title='Time Entry 19 December 2023, Site: BCP' />
    {/* <TablistMenu /> */}
    <Field label="Select a date">
      <DatePicker
        className={styles.control}
        placeholder="Select a date..."
        // {...props}
      />
    </Field>
    </div>
     
      <div className={styles.example}>
        {/* <Divider /> */}
      </div>
      <div className={styles.tableContainer}>
        {/* <Table
          size='small'
          aria-label='Table with small size'
          style={{ width: '243em', overflow: 'auto' }}
        >
          <TableHeader
            color='#107c10'
            style={{ backgroundColor: '#107c10', color: '#ffffff' }}
          >
            <TableRow style={{ height: '40px' }}>
              {columns.map(column => (
                <TableHeaderCell
                  key={column.columnKey}
                  style={{ color: '#ffffff' }}
                >
                  {column.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {timeEntry.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.unitNo}</TableCell>
                <TableCell>{item.productModel}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.owner}</TableCell>
                <TableCell>{item.productionDate}</TableCell>
                <TableCell>{item.shift}</TableCell>
                <TableCell>{item.operatorId}</TableCell>
                <TableCell>{item.operatorName}</TableCell>
                <TableCell>{item.smuStart}</TableCell>      
                <TableCell>{item.smuFinish}</TableCell>   
                <TableCell>{item.hm}</TableCell>    
                <TableCell>{item.activity}</TableCell>   
                <TableCell>{item.startTime}</TableCell>
                <TableCell>{item.endTime}</TableCell>
                <TableCell>{item.duration}</TableCell>
                <TableCell>{item.convertDuration}</TableCell>
                <TableCell>{item.bdNumber}</TableCell>
                <TableCell>{item.fromEquipment}</TableCell>
                <TableCell>{item.material}</TableCell>
                <TableCell>{item.matGroup}</TableCell>
                <TableCell>{item.distance}</TableCell>
                <TableCell>{item.loadingLocation}</TableCell>
                <TableCell>{item.dumpingLocation}</TableCell>
                <TableCell>{item.trip}</TableCell>
                <TableCell>{item.bcm}</TableCell>
                <TableCell>{item.notes}</TableCell>
                <TableCell>{item.cutOffStatus}</TableCell>
                <TableCell>{item.loc}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table> */}
        
        <ExcelLike dataXls={dataXls} setDataXls={setDataXls} />
      </div>
    </>
  )
}
