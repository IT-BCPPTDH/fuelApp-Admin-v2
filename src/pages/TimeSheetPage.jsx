import { useRef, useEffect, useCallback, useState } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import 'jspreadsheet-ce/dist/jspreadsheet.css'
import Title from '../components/Title'
import {
  CompoundButton,
  useId,
  Button,
  InfoLabel
} from '@fluentui/react-components'
import {
  SaveArrowRight24Regular,
  ArrowCircleLeft24Regular
} from '@fluentui/react-icons'
import { DynamicTablistMenu } from '../components/Tablist'
import FormComponent from '../components/FormComponent'
import Cookies from 'js-cookie'
import Services from '../services/timeEntry'
import { getLocalStorage } from '../helpers/toLocalStorage'

// const activitiesArray = [
//   'Breakdown',
//   'PM Service',
//   'Rain',
//   'Slippery',
//   'Safety Talk',
//   'Shift Change/Prestart Check',
//   'Rest and Meal',
//   'Daily Pray',
//   'Blasting',
//   'Refuelling/Greasing',
//   'Survey/Sample',
//   'Safety Fatigue Test',
//   'Friday Pray',
//   'Sunday Pray',
//   'Fasting',
//   'Foggy',
//   'Public Holiday',
//   'No Operator',
//   'Operator Fatigue',
//   'Waiting Operator',
//   'No Truck',
//   'No Equipment Support',
//   'Lighting Plant Problem',
//   'Washing Equipment',
//   'Front Maintenance',
//   'Road Maintenance',
//   'Disposal Maintenance',
//   'Stockpile Full/Crusher Maintenance',
//   'No Working Area',
//   'Blockade',
//   'Dust',
//   'Standby Accident',
//   'Stop Loading DT Refuelling',
//   'No Stock/Material',
//   'No Job',
//   'Others',
//   'Toilet',
//   'Queuing',
//   'No Digger',
//   'Tyre Check',
//   'Cleaning Vessel Truck',
//   'Working Production',
//   'Pit Support',
//   'Coal Cleaning',
//   'Travel Blasting',
//   'Travel Loading Point',
//   'Travel to Maintenance',
//   'Rehabilitation',
//   'Waiting Truck',
//   'Dump Maintenance',
//   'Haul Road Maintenance (HRM)',
//   'Stockpile ROM Maintenance',
//   'PLM Support',
//   'Maintenance Groundtest',
//   'Others',
//   'Working Support',
//   'Queuing at Front',
//   'Queuing at Road'
// ]
const tabs = [
  { label: 'Time Entry Support', value: 'time-entry-support' },
  { label: 'Time Entry Digger', value: 'time-entry-digger' },
  { label: 'Time Entry Hauler', value: 'time-entry-hauler' }
]
const shiftOptions = ['Day', 'Night']
const unitOptions = ['DT11223', 'DT11224', 'DT11225', 'DT11226']
// const jdeOptions = ['112233', '223344', '334455', '445566', '556677']

const HeaderPage = ({ title }) => {
  return (
    <div className='flex-space-between'>
      <Title title={title} />
      <Button
        icon={<ArrowCircleLeft24Regular />}
        iconPosition='before'
        style={{ backgroundColor: '#607d8b', color: '#ffffff' }}
      >
        Cancel Entry
      </Button>
    </div>
  )
}

const FooterPage = ({ handleSubmit, buttonDisabled }) => {
  return (
    <div className='row mt1em'>
      <div className='col-6'>
       
      </div>
      <div className='col-6'>
        <CompoundButton
          onClick={() => handleSubmit(1)}
          icon={<SaveArrowRight24Regular primaryFill='#ffffff' />}
          iconPosition='after'
          size='small'
          style={{
            float: 'right',
            marginRight: '0',
            padding: '0 1.5em',
            backgroundColor: '#035bb6',
            color: '#fff'
          }}
          disabled={buttonDisabled}
        >
          Save & Exit Form
        </CompoundButton>
        <CompoundButton
          onClick={() => handleSubmit(2)}
          icon={<SaveArrowRight24Regular primaryFill='#ffffff' />}
          iconPosition='after'
          size='small'
          style={{
            float: 'right',
            marginRight: '0.6em',
            padding: '0 1.5em',
            backgroundColor: 'green',
            color: '#fff'
          }}
          disabled={buttonDisabled}
        >
          Save & Entry Other
        </CompoundButton>
      </div>
    </div>
  )
}
export default function TimeSheetPage () {
  const jRef = useRef(null)
  const currentDate = new Date()
  const [totalDuration, setTotalDuration] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [master, setMaster] = useState()
  const [jdeOptions, setJdeOptions] = useState(()=>{
    let op = getLocalStorage('timeEntry-operator')
    return op
  })
  const [masterOP, setMasterOP] = useState(()=>{
    let op = getLocalStorage('timeEntry-masterOP')
    return op
  })
  
  const [formData, setFormData] = useState({
    formID: 'Time Entry Support',
    site: 'BCP',
    stafEntry: 'Nama Lengkap',
    tanggal: currentDate,
    shift: '',
    unitNo: '',
    lastUpdate: '-',
    jdeOperator: '',
    nameOperator: '',
    hmAwal: '10005.10',
    hmAkhir: '10023.10',
    hm: '18'
  })
  const [formValue, setFormValue] = useState()

  const formatTime = useCallback(input => {
    const parts = input.split('.')

    let hours = parseInt(parts[0], 10) || 0
    let minutes = parseInt(parts[1], 10) || 0

    if (minutes < 10 && parts[1] && parts[1].length === 1) {
      minutes *= 10
    }

    hours = Math.min(23, Math.max(0, hours))
    minutes = Math.min(59, Math.max(0, minutes))

    const formattedTime = `${String(hours).padStart(2, '0')}.${String(
      minutes
    ).padStart(2, '0')}.00`

    return formattedTime
  }, [])

  const calculateTotalTime = useCallback((startTime, endTime) => {
    const [startHours, startMinutes, startSeconds] = startTime
      .split('.')
      .map(Number)
    const [endHours, endMinutes, endSeconds] = endTime.split('.').map(Number)
    const totalStartSeconds =
      startHours * 3600 + startMinutes * 60 + startSeconds
    const totalEndSeconds = endHours * 3600 + endMinutes * 60 + endSeconds
    const timeDifferenceSeconds = totalEndSeconds - totalStartSeconds
    const hours = Math.floor(timeDifferenceSeconds / 3600)
    const minutes = Math.floor((timeDifferenceSeconds % 3600) / 60)
    const formattedTotalTime = `${String(hours).padStart(2, '0')}.${String(
      minutes
    ).padStart(2, '0')}`

    return formattedTotalTime
  }, [])

  const calculateTotalTimeFromArray = timeArray => {
    const totalMinutes = timeArray.reduce((total, formattedTime) => {
      const [hours, minutes] = formattedTime.split('.').map(Number)
      return total + hours * 60 + minutes
    }, 0)

    const totalHours = Math.floor(totalMinutes / 60)
    const remainingMinutes = totalMinutes % 60
    const formattedTotalTime = `${String(totalHours).padStart(2, '0')}.${String(
      remainingMinutes
    ).padStart(2, '0')}`

    return formattedTotalTime
  }

  const transformData = useCallback(
    inputData => {
      const newArray = []

      for (let i = 0; i < inputData.length; i++) {
        const currentData = inputData[i]
        
        const start_time = formatTime(currentData[2])
        const end_time = formatTime(currentData[3])
        const duration = calculateTotalTime(start_time, end_time)

        if (currentData[0] !== '') {
          const newData = {
            activity: currentData[0],
            delay_description: currentData[1],
            start: start_time,
            end: end_time,
            duration: duration,
            material: currentData[5],
            cut_status: currentData[6],
            digger: currentData[7],
            lokasi: currentData[8]
          }

          newArray.push(newData)
        }
      }

      return newArray
    },
    [formatTime, calculateTotalTime]
  )

  const onchange = useCallback(
    (val) => {
      // console.log(val)
      // console.log(transformData(val))
      // if (newValue !== '') {
        
        // const data = jRef.current.jspreadsheet.getData()
        // console.log(data)
        // console.log(transformData(data))
        let dt = transformData(val)
        setFormValue(dt)
      // }
    },
    [jRef, transformData]
  )

  useEffect(() => {
    let lastEndTimeVal = null
    let lastStartTimeVal = null
    let arrayTime = []
    let validateResult = false
    let delAct = null
    let arrData = []
    let arrTemp=[
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
      ['','','','','','','','',''],
    ]
    
    let act = getLocalStorage('timeEntry-activity')
    let mastr = getLocalStorage('timeEntry-master')
    setMaster(mastr)
    const options = {
      data: [],
      columns: [
        {
          type: 'dropdown',
          width: '250',
          title: 'Activity',
          source: act,
          autocomplete: true
        },
        { type: 'text', width: '215', title: 'Delay Description' },
        { type: 'text', width: '100', title: 'Start' },
        { type: 'text', width: '100', title: 'End' },
        { type: 'text', width: '100', title: 'Duration' },
        {
          type: 'dropdown',
          width: '130',
          title: 'Material',
          source: ['OB', 'Coal', 'TS', 'Mud']
        },
        { type: 'text', width: '100', title: 'Cut Status' },
        { type: 'text', width: '100', title: 'Digger' },
        { type: 'text', width: '100', title: 'Lokasi' }
      ],
      minDimensions: [9, 14],
      tableHeight: '375px',
      tableOverflow: true,
      // onchange: onchange,
      updateTable: function (instance, cell, col, row, val, label, cellName) {
        
        if(col==0){
          let v = cell.innerText
          let a = mastr?.find(obj => obj.activityname === v);
          delAct = a?.delaydescription
        }

        if(col==1){
          if(delAct!=null){
            cell.innerHTML = delAct
            val = delAct
          }
          // console.log(cell.innerText)
        }

        if (col == 2 || col == 3) {
          let val = cell.innerText
          if (val !== '') {
            const res = formatTime(val)
            cell.innerHTML = res
          }
        }

        for (let index = 0; index < 20; index++) {
          if (col == 2 && row == index) {
            lastStartTimeVal = cell.innerText
            val = cell.innerText
          }
          if (col == 3 && row == index) {
            lastEndTimeVal = cell.innerText
            val = cell.innerText
          }

          if (col == 2 && row == index + 1) {
            const resVal = calculateTotalTimeFromArray(arrayTime)
            validateResult = parseFloat(resVal) == 12 ? true : false
            if(!validateResult){
              cell.innerText = lastEndTimeVal
              val = lastEndTimeVal
            }
          }

          if (col == 4 && row == index) {
            const result = calculateTotalTime(lastStartTimeVal, lastEndTimeVal)
            if (result !== 'NaN.NaN') {
              cell.innerText = result
              val = cell.innerText
              arrayTime[index] = result
            }
          }
        }

        if (cellName == 'E14') {
          const resVal = calculateTotalTimeFromArray(arrayTime)
          setTotalDuration(resVal)       
        }
        
        // arrTemp[col] = val
        // console.log(1,arrTemp)
        // if(row>arrTemp[row].length-1){
        //   arrTemp.push(['','','','','','','','',''],)
        // }
        arrTemp[row][col] = val
        // console.log(col,row,val)
        // arrData[row]={
      
        // }
        onchange(arrTemp)

        // console.log(arrTemp)
      }
      
    }
    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options)
    }
    return () => {
      jspreadsheet.destroy(jRef)
    }
  }, [onchange, calculateTotalTime, formatTime])

  const handleSubmit = async(type) => {
    let act = JSON.stringify(formValue)
    let data ={
      ...formData,
      activity: act
    }
    
    let dt = await Services.postTimeEntrySupport(data)
    console.log(dt)
  }

  const handleChange = (ev, data) => {
    const { name, value } = data
    if (name === 'hmAwal' || name === 'hmAkhir') {
      const isValidNumber = /^(\d+(\.\d{0,2})?)?$/.test(value)

      if (isValidNumber) {
        const formattedValue = value !== '' ? value : ''
        setFormData(prevFormData => ({
          ...prevFormData,
          [name]: formattedValue
        }))

        if (name === 'hmAkhir') {
          const hmAwalValue = parseFloat(formData.hmAwal) || 0
          const hmAkhirValue = parseFloat(formattedValue) || 0
          const totalHmValue = (hmAkhirValue - hmAwalValue).toFixed(2)
          // console.log(hmAwalValue, hmAkhirValue)

          if (hmAkhirValue < hmAwalValue) {
            // console.error("'hmAkhir' should not be less than 'hmAwal'");
            setFormData(prevFormData => ({ ...prevFormData, hm: 'ERROR' }))
            ev.target.parentElement.classList.add('border-input-error')
          } else {
            setFormData(prevFormData => ({ ...prevFormData, hm: totalHmValue }))
            if (
              ev.target.parentElement.classList.contains('border-input-error')
            ) {
              ev.target.parentElement.classList.remove('border-input-error')
            }
          }

          // console.log(totalHmValue)
        }
      } else {
        console.error('Invalid input for HM values')
      }
    } else {
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    }

    if(name === 'jdeOperator'){
      let mo = masterOP?.find(v => v.jde === value)
      setFormData({
        ...formData,
        nameOperator: mo.fullname,
        jdeOperator: value
      })
    }
  }

  const components = [
    {
      inputId: useId('formID'),
      grid: 'col-2',
      label: 'Form ID',
      value: formData.formID,
      type: 'StaticInfo'
    },

    {
      inputId: useId('site'),
      grid: 'col-2',
      label: 'Site',
      value: formData.site,
      readOnly: true,
      disabled: true,
      type: 'Input'
    },
    {
      inputId: useId('stafEntry'),
      grid: 'col-2',
      label: 'Staf Entry',
      value: formData.stafEntry,
      readOnly: true,
      disabled: true,
      type: 'Input'
    },
    {
      inputId: useId('tanggal'),
      name: 'tanggal',
      grid: 'col-2',
      label: 'Tanggal',
      value: formData.tanggal,
      readOnly: false,
      disabled: false,
      type: 'DatePicker'
    },
    {
      inputId: useId('shift'),
      name: 'shift',
      grid: 'col-2',
      label: 'Shift',
      value: formData.shift,
      readOnly: false,
      disabled: false,
      type: 'Combobox',
      options: shiftOptions
    },

    {
      inputId: useId('unitNo'),
      name: 'unitNo',
      grid: 'col-2',
      label: 'Unit No',
      value: formData.unitNo,
      readOnly: false,
      disabled: false,
      type: 'Combobox',
      options: unitOptions
    },
    {
      inputId: useId('lastUpdate'),
      grid: 'col-2',
      label: 'Last Update',
      value: formData.lastUpdate,
      type: 'StaticInfo'
    },
    {
      inputId: useId('jdeOperator'),
      name: 'jdeOperator',
      grid: 'col-2',
      label: 'JDE Operator',
      value: formData.jdeOperator,
      readOnly: false,
      disabled: false,
      type: 'Combobox',
      options: jdeOptions
    },
    {
      inputId: useId('nameOperator'),
      name: 'nameOperator',
      grid: 'col-2',
      label: 'Nama Operator',
      value: formData.nameOperator,
      readOnly: false,
      disabled: true,
      type: 'Input'
    },
    {
      inputId: useId('hmAwal'),
      name: 'hmAwal',
      grid: 'col-2',
      label: 'HM Awal',
      value: formData.hmAwal,
      readOnly: false,
      disabled: false,
      type: 'Input'
    },
    {
      inputId: useId('hmAkhir'),
      name: 'hmAkhir',
      grid: 'col-2',
      label: 'HM Akhir',
      value: formData.hmAkhir,
      readOnly: false,
      disabled: false,
      type: 'Input'
    },
    {
      inputId: useId('hm'),
      name: 'hm',
      grid: 'col-2',
      label: 'HM',
      value: formData.hm,
      readOnly: true,
      disabled: true,
      type: 'Input'
    }
  ]

  const getDataFirst = () =>{
    let user = Cookies.get('user')
    user = JSON.parse(user)

    const now = new Date();
    const currentHour = now.getHours();
    let shift = null
    if(currentHour >= 6 && currentHour < 18){
      shift = 'Day'
    }else{
      shift = 'Night'
    }



    let dt = formData
    dt = {
      ...dt,
      shift: shift,
      stafEntry: user.fullname
    }
    setFormData(dt)
  }

  useEffect(() => {
    const disabled = (parseFloat(totalDuration) > 12 || parseFloat(totalDuration) < 12) ? true: false
    setButtonDisabled(disabled)
    getDataFirst()
  }, [totalDuration]);

  return (
    <>
      <HeaderPage title={`Form Operator Activity Timesheet - Data Entry`} />
      <div className='form-wrapper'>
        <FormComponent handleChange={handleChange} components={components} />
        <div ref={jRef} className='mt1em' />
        <div className='row'>
          <div className='col-6'>
          <DynamicTablistMenu tabs={tabs} />
          </div>
          <div className='col-6 flex-row'>
            <InfoLabel
              size='large'
              info="Jika nilai total < 12 atau > 12, status form menjadi 'INVALIDATED'"
            >
              Total Duration: {totalDuration}
            </InfoLabel>
           
              {(parseFloat(totalDuration) > 12 || parseFloat(totalDuration) < 12) ? (
                 <div className="status-element status-invalidated">
                    INVALIDATED
                 </div>
                ): (
                  <div className="status-element status-validated">
                    VALIDATED
                  </div>
                 )}
            
          </div>
        </div>
        <FooterPage handleSubmit={handleSubmit} buttonDisabled={false} />
        {/* <FooterPage handleSubmit={handleSubmit} buttonDisabled={buttonDisabled} /> */}
      </div>

      {/* <button onClick={getData}>Get Data</button> */}
    </>
  )
}
