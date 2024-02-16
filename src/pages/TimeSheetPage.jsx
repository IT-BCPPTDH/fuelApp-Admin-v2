import { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { InfoLabel } from '@fluentui/react-components'
import { DynamicTablistMenu } from '../components/Tablist'
import FormComponent from '../components/FormComponent'
import Cookies from 'js-cookie'
import Services from '../services/timeEntry'
import { getLocalStorage } from '../helpers/toLocalStorage'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
import { calculateTotalTimeFromArray } from '../helpers/timeHelper'
import { FooterPageForm } from '../components/FormComponent/FooterPageForm'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../../models/db'

const tabs = [
  { label: 'Time Entry Support', value: 'time-entry/support/' },
  { label: 'Time Entry Digger', value: 'time-entry/digger/' },
  { label: 'Time Entry Hauler', value: 'time-entry-hauler' }
]
const active = '/timesheet-dataentry/'; 
const shiftOptions = ['Day', 'Night']
const unitOptions = ['DT11223', 'DT11224', 'DT11225', 'DT11226']
const activeTab = 'time-entry/support/';

export default function TimeSheetPage () {
  const jRef = useRef(null)
  const currentDate = new Date()
  const [totalDuration, setTotalDuration] = useState()
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const master = useLiveQuery(() => db.activity.toArray())

  const [jdeOptions, setJdeOptions] = useState(() => getLocalStorage('timeEntry-operator'));
  const [unitOptions, setUnitOption] = useState(() => getLocalStorage('timeEntry-unit'));
  const [masterOP, setMasterOP] = useState(() => getLocalStorage('timeEntry-masterOP'));


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
    val => {
      let dt = transformData(val)
      setFormValue(dt)
    },
    [transformData]
  )

  useEffect(() => {

    let lastEndTimeVal = null
    let lastStartTimeVal = null
    let arrayTime = []
    let validateResult = false
    let delAct = null
    let arrTemp = [
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '']
    ]

    let act = getLocalStorage('timeEntry-activity')
    let mastr = getLocalStorage('timeEntry-masterAct')

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
      updateTable: function (instance, cell, col, row, val, label, cellName) {
        if (col == 0) {
          let v = cell.innerText
          let a = mastr?.find(obj => obj.activityname === v)
          delAct = a?.delaydescription
        }

        if (col == 1) {
          if (delAct != null) {
            cell.innerHTML = delAct
            val = delAct
          }
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
            if (!validateResult) {
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

        if (row > arrTemp[row].length - 1) {
          arrTemp.push(['', '', '', '', '', '', '', '', ''])
        }
        arrTemp[row][col] = val
        onchange(arrTemp)
      }
    }
    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options)
    }
    return () => {
      jspreadsheet.destroy(jRef)
    }
  }, [])

  const handleSubmit = async () => {
    let act = JSON.stringify(formValue)
    let data = {
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

    // if (name === 'jdeOperator') {
    //   let mo = masterOP?.find(v => v.jde === value)
    //   setFormData({
    //     ...formData,
    //     nameOperator: mo.fullname,
    //     jdeOperator: value
    //   })
    // }
  }

  const components = useMemo(
    () => [
      {
        name: 'formID',
        grid: 'col-2',
        label: 'Form ID',
        value: formData.formID,
        type: 'StaticInfo'
      },

      {
        name: 'site',
        grid: 'col-2',
        label: 'Site',
        value: formData.site,
        readOnly: true,
        disabled: true,
        type: 'Input'
      },
      {
        name: 'stafEntry',
        grid: 'col-2',
        label: 'Staf Entry',
        value: formData.stafEntry,
        readOnly: true,
        disabled: true,
        type: 'Input'
      },
      {
        name: 'tanggal',
        grid: 'col-2',
        label: 'Tanggal',
        value: formData.tanggal,
        readOnly: false,
        disabled: false,
        type: 'DatePicker'
      },
      {
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
        name: 'lastUpdate',
        grid: 'col-2',
        label: 'Last Update',
        value: formData.lastUpdate,
        type: 'StaticInfo'
      },
      {
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
        name: 'nameOperator',
        grid: 'col-2',
        label: 'Nama Operator',
        value: formData.nameOperator,
        readOnly: false,
        disabled: true,
        type: 'Input'
      },
      {
        name: 'hmAwal',
        grid: 'col-2',
        label: 'HM Awal',
        value: formData.hmAwal,
        readOnly: false,
        disabled: false,
        type: 'Input'
      },
      {
        name: 'hmAkhir',
        grid: 'col-2',
        label: 'HM Akhir',
        value: formData.hmAkhir,
        readOnly: false,
        disabled: false,
        type: 'Input'
      },
      {
        name: 'hm',
        grid: 'col-2',
        label: 'HM',
        value: formData.hm,
        readOnly: true,
        disabled: true,
        type: 'Input'
      }
    ],
    [formData, jdeOptions]
  )

  const getDataFirst = useCallback(() => {
    let user = Cookies.get('user')
    user = JSON.parse(user)

    const now = new Date()
    const currentHour = now.getHours()
    let shift = null
    if (currentHour >= 6 && currentHour < 18) {
      shift = 'Day'
    } else {
      shift = 'Night'
    }

    let dt = formData
    dt = {
      ...dt,
      shift: shift,
      stafEntry: user.fullname
    }
    setFormData(dt)
  }, [formData, setFormData])

  useEffect(() => {
    const disabled =
      parseFloat(totalDuration) > 12 || parseFloat(totalDuration) < 12
        ? true
        : false
    setButtonDisabled(disabled)

    getDataFirst()

  }, [totalDuration]);

  const handleTabChange = (value) => {
    console.log(`Navigating to: /${value}`);
    navigate(`/${value}`);
  };

  return (
    <>
      <HeaderPageForm title={`Form Operator Activity Timesheet - Data Entry`} />
      <div className='form-wrapper'>
        <FormComponent handleChange={handleChange} components={components} />
        <div ref={jRef} className='mt1em' />
        <div className='row'>
          <div className='col-6'>
          <DynamicTablistMenu tabs={tabs} active={activeTab} onTab={() => handleTabChange(tabs.value)} />
          </div>
          <div className='col-6 flex-row'>
            <InfoLabel
              size='large'
              info="Jika nilai total < 12 atau > 12, status form menjadi 'INVALIDATED'"
            >
              Total Duration: {totalDuration}
            </InfoLabel>

            {parseFloat(totalDuration) > 12 ||
            parseFloat(totalDuration) < 12 ? (
              <div className='status-element status-invalidated'>
                INVALIDATED
              </div>
            ) : (
              <div className='status-element status-validated'>VALIDATED</div>
            )}
          </div>
        </div>

        <FooterPageForm
          handleSubmit={handleSubmit}
          buttonDisabled={buttonDisabled}
        />
      </div>

      {/* <button onClick={getData}>Get Data</button> */}
    </>
  )
}
