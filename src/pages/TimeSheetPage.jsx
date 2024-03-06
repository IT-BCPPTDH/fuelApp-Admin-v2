import { useRef, useEffect, useCallback, useState, useMemo } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
// import { InfoLabel } from '@fluentui/react-components'
import { Form28Regular } from '@fluentui/react-icons'
import { DynamicTablistMenu } from '../components/Tablist'
import FormComponent from '../components/FormComponent'
import Cookies from 'js-cookie'
import { getLocalStorage } from '../helpers/toLocalStorage'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
import { calculateTotalTimeFromArray } from '../helpers/timeHelper'
import { FooterPageForm } from '../components/FormComponent/FooterPageForm'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../models/db'
import { NavigateUrl } from '../utils/Navigation'
import { menuTabsTimeEntry } from '../helpers/menuHelper'
import { shiftOptionsData, materialOptions } from '../helpers/optionHelper'
import { tabMenuTimeEntryEnum } from '../utils/Enums'
import { timeEntryFormField } from '../helpers/formFieldHelper'
import { getURLPath } from '../helpers/commonHelper'
import Services from '../services/timeEntry'
import { insertTimeEntry } from '../helpers/indexedDB/insert'
import { TableDataInputed } from '../components/TimeSheet/TableDataInputed'
import { formatTime, calculateTotalTime } from '../helpers/timeHelper'
import { getTimeEntryDetailById, getTimeEntryByUnit } from '../helpers/indexedDB/getData'
import { DialogComponent } from '../components/Dialog'
import { generateID } from '../helpers/commonHelper'

export default function TimeSheetPage() {

  const jRef = useRef(null)
  const [totalDuration, setTotalDuration] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [formData, setFormData] = useState({});
  const [menuTabs, setMenuTabs] = useState([])
  const [shiftOptions] = useState(shiftOptionsData)
  const [activeTab, setActiveTab] = useState(getURLPath())
  const [formTitle, setFormTitle] = useState('Unit Digger')
  // const [formValue, setFormValue] = useState([])
  const [tableData, setTableData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [isNew, setIsNew] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMessage, setDialogMessage] = useState("")
  const [randomId] = useState(generateID())

  useLiveQuery(() => db.activity.toArray())

  const [jdeOptions] = useState(() => getLocalStorage('timeEntry-operator'));
  const [unitOptions] = useState(() => getLocalStorage('timeEntry-unit'));
  const masterOP = useLiveQuery(() => db.operator.toArray());

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
            operator: currentData[6],
            cut_status: currentData[7],
            digger: currentData[8],
            lokasi: currentData[9]
          }

          newArray.push(newData)
        }
      }

      return newArray
    },
    []
  )

  const handleChangeSheet = useCallback(() => {
    const spreadSheet = jRef.current.jspreadsheet
    const masterActivity = getLocalStorage('timeEntry-masterAct')
    let startTime = null
    let endTime = null
    let arrayTime = []

    for (let index = 0; index < 20; index++) {
      const col1Val = spreadSheet.getValueFromCoords(0, index)
      const activity = masterActivity?.find(obj => obj.activityname === col1Val)
      const descriptionActivity = activity?.delaydescription

      if (descriptionActivity) spreadSheet.updateCell(1, index, descriptionActivity, false)

      const colStartTime = spreadSheet.getValueFromCoords(2, index)
      const colEndTime = spreadSheet.getValueFromCoords(3, index)

      if (colStartTime) {
        startTime = formatTime(colStartTime)
        spreadSheet.updateCell(2, index, startTime, false)
      }

      if (colEndTime) {
        endTime = formatTime(colEndTime)
        spreadSheet.updateCell(3, index, endTime, false)
      }

      if (colStartTime && colEndTime) {
        const result = calculateTotalTime(startTime, endTime)
        if (result !== 'NaN.NaN') {
          if (parseFloat(startTime) > parseFloat(endTime)) {
            spreadSheet.updateCell(3, index, '', false);
            spreadSheet.updateCell(4, index, '', false);
          } else {
            spreadSheet.updateCell(4, index, result, false)
            arrayTime[index] = result
          }
        }

        const validateResult = parseFloat(calculateTotalTimeFromArray(arrayTime)) == 12 ? true : false
        if (!validateResult) {
          spreadSheet.updateCell(2, index + 1, endTime, false)
          if (parseFloat(startTime) > parseFloat(endTime)) {
            spreadSheet.updateCell(2, index + 1, '', false);
          }
        }
      }
    }

    const datanya = spreadSheet.getData()
    setTableData(datanya)

    // let dt = transformData(datanya)
    // setFormValue(dt)

    const totalDurationTime = calculateTotalTimeFromArray(arrayTime)
    // console.log(totalDurationTime)
    setTotalDuration(totalDurationTime)

  }, [])

  useEffect(() => {

    let act = getLocalStorage('timeEntry-activity')
    const width = screen.width;

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
          source: materialOptions,
          autocomplete: true
        },
        {
          type: 'dropdown',
          width: '130',
          title: 'Operator',
          source: jdeOptions,
          autocomplete: true
        },
        { type: 'text', width: '100', title: 'Cut Status' },
        { type: 'text', width: '100', title: 'Digger' },
        { type: 'text', width: '100', title: 'Lokasi' }
      ],
      minDimensions: [9, 14],
      tableHeight: '375px',
      tableWidth: `${(width * 86) / 100}px`,
      tableOverflow: true,
      onafterchanges: handleChangeSheet,
    }
    if (!jRef.current.jspreadsheet) {
      jspreadsheet(jRef.current, options)
    }

  }, [jdeOptions, handleChangeSheet])

  const handleSubmitToServer = useCallback(async (localData) => {
    // console.log(localData)
    for (let index = 0; index < localData.length; index++) {
      const data = localData[index];
      let transformedData = transformData(data.activity)
      console.log(data)

      let activity = JSON.stringify(transformedData)
      let dataToSave = {
        formID: data.formID,
        site: data.site,
        stafEntry: data.stafEntry,
        tanggal: data.tanggal,
        shift: data.shift,
        unitNo: data.unitNo,
        hmAwal: data.hmAwal,
        hmAkhir: data.hmAkhir,
        hm: data.hm,
        activity: activity
      }
      let saveData = await Services.postTimeEntrySupport(dataToSave)
      console.log(saveData)

    }


  }, [transformData])

  const handleSubmitToLocalDB = async () => {

    let data = {
      ...formData,
      activity: tableData,
      formTitle: formTitle
    }

    const checkExisted = await getTimeEntryByUnit(data.unitNo)

    if (checkExisted.length === 0) {
      let inserted = await insertTimeEntry(data)
      // console.log(inserted)
      if (inserted) {
        setLoaded(true)
        setIsNew(true)
        setFormData([])
        setTotalDuration(0)
        jRef.current.jspreadsheet.setData([])
      }
    } else {
      setOpenDialog(true)
      setDialogTitle("Cannot Save Database")
      setDialogMessage(`Please check again Unit No field, Unit No: ${data.unitNo} already existed in Database`)
    }
  }

  const handleChange = (ev, data) => {
    const { name, value } = data;

    if (name === 'hmAwal' || name === 'hmAkhir') {
      const isValidNumber = /^(\d+(\.\d{0,2})?)?$/.test(value);

      if (isValidNumber) {
        const formattedValue = value !== '' ? value : '';
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: formattedValue,
        }));

        if (name === 'hmAkhir') {
          const hmAwalValue = parseFloat(formData.hmAwal) || 0;
          const hmAkhirValue = parseFloat(formattedValue) || 0;
          const totalHmValue = (hmAkhirValue - hmAwalValue).toFixed(2);

          if (hmAkhirValue < hmAwalValue) {
            setFormData((prevFormData) => ({ ...prevFormData, hm: 'ERROR' }));
            ev.target.parentElement.classList.add('border-input-error');
          } else {
            setFormData((prevFormData) => ({ ...prevFormData, hm: totalHmValue }));
            const inputErrorClassList = ev.target.parentElement.classList;
            if (inputErrorClassList.contains('border-input-error')) {
              inputErrorClassList.remove('border-input-error');
            }
          }
        }
      } else {
        console.error('Invalid input for HM values');
      }
    } else if (name === 'jdeOperator' && value.length >= 6) {
      const mo = masterOP?.find((v) => v.jde === value);
      setFormData({
        ...formData,
        nameOperator: mo?.fullname || '',
        jdeOperator: value,
      });
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

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
      tanggal: now,
      site: "BCP",
      stafEntry: user.fullname,
      formID: randomId
    }
    setFormData(dt)
  }, [formData, setFormData, randomId])

  useEffect(() => {
    setMenuTabs(menuTabsTimeEntry)
    setFormData(timeEntryFormField)
  }, []);

  useEffect(() => {
    const disabled =
      parseFloat(totalDuration) > 12 || parseFloat(totalDuration) < 12
        ? true
        : false
    setButtonDisabled(disabled)

    if (isNew) {
      getDataFirst()
    }

    const lastPart = getURLPath()
    setActiveTab(lastPart)

    switch (lastPart) {
      case tabMenuTimeEntryEnum.UNIT_DIGGER:
        setFormTitle('Unit Digger')
        break;
      case tabMenuTimeEntryEnum.UNIT_HAULER:
        setFormTitle("Unit Hauler")
        break;
      case tabMenuTimeEntryEnum.UNIT_SUPPORT:
        setFormTitle("Unit Support")
        break;
      default:
        break;
    }

  }, [totalDuration, getDataFirst, isNew]);

  const handleEditData = useCallback(async (itemId) => {
    setIsNew(false)
    const spreadSheet = jRef.current.jspreadsheet
    const dataDetail = await getTimeEntryDetailById(itemId)
    if (dataDetail) {
      setFormData({
        site: dataDetail.site,
        tanggal: new Date(dataDetail.tanggal),
        shift: dataDetail.shift,
        unitNo: dataDetail.unitNo,
        hmAwal: dataDetail.hmAwal,
        hmAkhir: dataDetail.hmAkhir,
        hm: dataDetail.hm,
        formID: dataDetail.formID,
        stafEntry: dataDetail.stafEntry
      })

      spreadSheet.setData(dataDetail.activity)
      handleChangeSheet()
    }
  }, [handleChangeSheet])

  const components = useMemo(
    () => [
      {
        name: 'site',
        grid: 'col-2',
        label: 'Site',
        value: formData.site,
        readOnly: false,
        disabled: false,
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
      },
      {
        name: 'formID',
        grid: 'col-2',
        label: 'Form ID',
        value: formData.formID,
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
        name: 'note',
        grid: 'col-6',
        label: 'Note',
        value: "Mohon lengkapi form berikut, dan pastikan durasi total 12 jam, nilai 'End Time' harus lebih besar dari 'Start Time'",
        type: 'StaticInfo'
      },
      // {
      //   name: 'jdeOperator',
      //   grid: 'col-2',
      //   label: 'JDE Operator',
      //   value: formData.jdeOperator,
      //   readOnly: false,
      //   disabled: false,
      //   type: 'Combobox',
      //   options: jdeOptions
      // },
      // {
      //   name: 'nameOperator',
      //   grid: 'col-2',
      //   label: 'Nama Operator',
      //   value: formData.nameOperator,
      //   readOnly: true,
      //   disabled: false,
      //   type: 'Input'
      // },
    ],
    [formData, shiftOptions, unitOptions]
  )

  return (
    <>
      <HeaderPageForm
        title={`Form Time Entry - ${formTitle}`}
        urlCreate={''}
        urlBack={NavigateUrl.TIME_ENTRY_MAIN_TABLE}
        childrenMenu={<DynamicTablistMenu tabs={menuTabs} active={activeTab} />}
        icon={<Form28Regular />}
      />
      <div className='form-wrapper'>
        <FormComponent handleChange={handleChange} components={components} />
        <div ref={jRef} className='mt1em' />
        <div className='row mt1em'>
          <div className='col-6 flex-row'>
            {/* <InfoLabel
              size='large'
              info="Jika nilai total < 12 atau > 12, status form menjadi 'INVALIDATED'"
            >
              Total Duration: {totalDuration}
            </InfoLabel> */}
            <h4> Total Duration: {totalDuration}</h4>

            {parseFloat(totalDuration) > 12 ||
              parseFloat(totalDuration) < 12 ? (
              <div className='status-element status-invalidated'>
                INVALIDATED
              </div>
            ) : (
              <div className='status-element status-validated'>VALIDATED</div>
            )}
          </div>
          <div className='col-6'>
            <FooterPageForm
              handleSubmit={handleSubmitToLocalDB}
              buttonDisabled={buttonDisabled}
            />
          </div>
        </div>
      </div>
      <div className="mt1em form-wrapper">
        <TableDataInputed
          formTitle={formTitle}
          loaded={loaded}
          setLoaded={setLoaded}
          handleEdit={handleEditData}
          handleSubmitToServer={handleSubmitToServer}
        />
      </div>
      <DialogComponent open={openDialog} setOpen={setOpenDialog} title={dialogTitle} message={dialogMessage} />
    </>
  )
}
