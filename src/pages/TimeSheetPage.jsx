import { useRef, useEffect, useCallback, useState, useMemo, lazy, Suspense } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { Form28Regular } from '@fluentui/react-icons'
import { DynamicTablistMenu } from '../components/Tablist'
import Cookies from 'js-cookie'
import { getLocalStorage, sortArray, toLocalStorage } from '../helpers/toLocalStorage'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
import { calculateTotalTimeFromArray, formatTime, calculateTotalTime, calculateAndConvertDuration, 
  convertToAMPM, calculateMidnightTime, calculateDifference, checkValidHMAkhir } from '../helpers/timeHelper'
import { FooterPageForm } from '../components/FormComponent/FooterPageForm'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../models/db'
import { NavigateUrl } from '../utils/Navigation'
import { menuTabsTimeEntry } from '../helpers/menuHelper'
import { shiftOptionsData, materialOptions, getExcaOptions } from '../helpers/optionHelper'
import { tabMenuTimeEntryEnum } from '../utils/Enums'
import { hasValuesInNestedArray } from '../helpers/formFieldHelper'
import { getURLPath, generateID } from '../helpers/commonHelper'
import Services from '../services/timeEntry'
import { insertTimeEntry, insertTimeEntryDraft } from '../helpers/indexedDB/insert'
import { getTimeEntryDetailById, getTimeEntryByUnit, getUnitDataByNo, getOperatorNameById, getTimeEntryDraftByUnit } from '../helpers/indexedDB/getData'
import { DialogComponent } from '../components/Dialog'
import { deleteTimeEntries } from '../helpers/indexedDB/deteleData'
import { useNavigate } from 'react-router-dom'
import { updateTimeEntry, updateTimeEntryDraft } from '../helpers/indexedDB/editData'
import { HeaderTitle } from '../utils/Wording'

const TableDataValidated = lazy(() => import('../components/TimeSheet/TableDataValidated'))
const FormComponent = lazy(() => import('../components/FormComponent'))
const TableDraft = lazy(() => import('../components/TimeSheet/TableDataDraft'))

export default function TimeSheetPage() {

  const jRef = useRef(null)
  const [totalDuration, setTotalDuration] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [buttonDraftDisabled, setButtonDraftDisabled] = useState(true)
  const [formData, setFormData] = useState({});
  const [menuTabs, setMenuTabs] = useState([])
  const [shiftOptions] = useState(shiftOptionsData)
  const [activeTab, setActiveTab] = useState(getURLPath())
  const [formTitle, setFormTitle] = useState('')
  const [tableData, setTableData] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [isNew, setIsNew] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMessage, setDialogMessage] = useState("")
  const [sendingData, setSendingData] = useState(false)
  const navigate = useNavigate()
  const [dataItemId, setDataItemId] = useState(0)
  const [sortedUnitOptions, setSortedUnitOptions] = useState([])

  useLiveQuery(() => db.activity.toArray())

  const [jdeOptions] = useState(() => getLocalStorage('timeEntry-operator'));
  const [unitOptions] = useState(() => getLocalStorage('timeEntry-unit'));
  const masterOP = useLiveQuery(() => db.operator.toArray());

  const transformData = useCallback(
    async (inputData) => {
      const newArray = []

      for (let i = 0; i < inputData.length; i++) {
        const currentData = inputData[i]
        const start_time = formatTime(currentData[2])
        const end_time = formatTime(currentData[3])
        const duration = calculateAndConvertDuration(start_time, end_time)

        if (currentData[0] !== '') {

          const operatorData = await getOperatorNameById(currentData[6])

          const newData = {
            activity: currentData[0],
            delay_description: currentData[1],
            start_time: convertToAMPM(start_time),
            end_time: convertToAMPM(end_time),
            duration: duration.duration,
            convertDuration: duration.convertDuration,
            material: currentData[5],
            operatorId: currentData[6],
            operatorName: operatorData?.fullname ?? '-',
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
    const shift = getLocalStorage('shift')

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
        let result = calculateTotalTime(startTime, endTime)
        if (result !== 'NaN.NaN') {
          if (parseFloat(startTime) > parseFloat(endTime)) {
            if (shift === 'Night' && parseFloat(startTime) > 19.00 && parseFloat(startTime) < 23.59) {
              const resultMidnigth = calculateMidnightTime(startTime, endTime)
              spreadSheet.updateCell(4, index, resultMidnigth, false)
              arrayTime[index] = resultMidnigth
            } else {
              spreadSheet.updateCell(3, index, '', false);
              spreadSheet.updateCell(4, index, '', false);
            }
          } else {
            spreadSheet.updateCell(4, index, result, false)
            arrayTime[index] = result
          }
        }

        const validateResult = parseFloat(calculateTotalTimeFromArray(arrayTime)) == 12 ? true : false
        if (!validateResult) {
          spreadSheet.updateCell(2, index + 1, endTime, false)
          if (parseFloat(startTime) > parseFloat(endTime)) {
            if (shift === 'Night' && parseFloat(startTime) > 19.00 && parseFloat(startTime) < 23.59) {
              spreadSheet.updateCell(2, index + 1, endTime, false)
            } else {
              spreadSheet.updateCell(2, index + 1, '', false);
            }
          }
        }
      }
    }
    const datanya = spreadSheet.getData()
    setTableData(datanya)

    const hasValue = hasValuesInNestedArray(datanya)
    if(hasValue){
      setButtonDraftDisabled(false)
    }

    const totalDurationTime = calculateTotalTimeFromArray(arrayTime)
    setTotalDuration(totalDurationTime)

  }, [])

  useEffect(() => {
    const fetchData = async () => {
      let act = getLocalStorage('timeEntry-activity');
      const width = screen.width;
      const excaOptions = await getExcaOptions(); 
  
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
          { type: 'text', width: '150', title: 'Delay Description' },
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
          { type: 'dropdown', width: '100', title: 'Digger', source: excaOptions, autocomplete: true },
          { type: 'text', width: '100', title: 'Lokasi' }
        ],
        minDimensions: [9, 14],
        tableHeight: '375px',
        tableWidth: `${(width * 86) / 100}px`,
        tableOverflow: true,
        allowInsertColumn: false,
        onafterchanges: handleChangeSheet,
      };
  
      if (!jRef.current.jspreadsheet) {
        jspreadsheet(jRef.current, options);
      }
    };
  
    fetchData();
  }, [jdeOptions, handleChangeSheet]);
  

  const handleSubmitToServer = useCallback(async (localData) => {
    try {
      const postData = (await Promise.all(localData.map(async (data) => {
        const transformedData = await transformData(data.activity);
        const unitData = await getUnitDataByNo(data.unitNo);

        return transformedData.map((activity) => ({
          formID: data.formID,
          unitNo: data.unitNo,
          productModel: unitData.type ?? '-',
          description: unitData.merk ? `${unitData.merk} ${unitData.category} ${unitData.type}` : '-',
          owner: unitData.owner ?? '-',
          productionDate: data.tanggal,
          shift: data.shift,
          operatorId: activity.operatorId,
          operatorName: activity.operatorName,
          smuStart: data.hmAwal,
          smuFinish: data.hmAkhir,
          hm: data.hm,
          activity: activity.activity,
          startTime: activity.start_time,
          endTime: activity.end_time,
          duration: activity.duration,
          convertDuration: activity.convertDuration,
          bdNumber: '-',
          fromEquipment: activity.digger,
          material: activity.material,
          matGroup: '-',
          distance: '-',
          loadingLocation: '-',
          dumpingLocation: '-',
          trip: '-',
          bcm: '-',
          notes: '-',
          cutOffStatus: activity.cut_status,
          loc: activity.lokasi,
          site: data.site,
          unitType: data.formTitle,
          stafEntry: data.stafEntry
        }));
      }))).flat();

      setSendingData(true)
      const saveData = await Services.postTimeEntryData(postData);
      if (saveData.status === 200) {
        const deleted = localData.map(async (val) => {
          return await deleteTimeEntries(val.id)
        })
        if (deleted) {
          setSendingData(false)
          navigate('/time-entry-from-collector')
        }

      } else {
        // TODO : add message when data already existed in database
      }
    } catch (error) {
      console.error('Error while submitting data:', error);
    }
  }, [transformData, navigate]);

  const handleSubmitToLocalDB = useCallback(async (type) => {
   
    const data = {
      ...formData,
      activity: tableData,
      formTitle: formTitle,
      totalDuration: totalDuration
    };

    const resetState = () => {
      setLoaded(true);
      setIsNew(true);
      setFormData([]);
      setTotalDuration(0);
      jRef.current.jspreadsheet.setData([]);
    };

    console.log(type, data) 
    // Validated
    if(type === 1){
      const checkExisted = await getTimeEntryByUnit(data.unitNo);
      if (checkExisted.length === 0) {
        const inserted = await insertTimeEntry(data);
        if (inserted) {
          resetState();
        }
      } else if (isNew) {
        setOpenDialog(true);
        setDialogTitle("Cannot Save Database");
        setDialogMessage(`Please check again Unit No field, Unit No: ${data.unitNo} already existed in Database`);
      } else {
        const updated = await updateTimeEntry(dataItemId, data);
        if (updated) {
          resetState();
        }
      }
    
    // Draft
    } else {
      const checkExisted = await getTimeEntryDraftByUnit(data.unitNo)
      if(checkExisted.length === 0){
        const inserted = await insertTimeEntryDraft(data)
        console.log(inserted);
        if(inserted){
          resetState()
        }
      } else if (isNew) {
        setOpenDialog(true);
        setDialogTitle("Cannot Save Database");
        setDialogMessage(`Please check again Unit No field, Unit No: ${data.unitNo} already existed in Database`);
      } else {
        const updated = await updateTimeEntryDraft(dataItemId, data);
        if (updated) {
          resetState();
        }
      }
    }

  }, [dataItemId, formData, formTitle, isNew, tableData])

  const handleChange = (ev, data) => {
    const { name, value } = data;

    if (name === 'hmAwal' || name === 'hmAkhir') {

      const isValidNumber = /^(\d+(\.\d{0,3})?)?(,\d{0,2})?$/.test(value);

      if (isValidNumber) {
        const formattedValue = value !== '' ? value : '';
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: formattedValue,
        }));

        if (name === 'hmAkhir') {
          const totalHmValue = calculateDifference(formData.hmAwal, formattedValue)
          const check = checkValidHMAkhir(formData.hmAwal, formattedValue)
          const convertValue = parseFloat(totalHmValue.toString().replace(',', '.'),2)

          if (!check) {
            setFormData((prevFormData) => ({ ...prevFormData, hm: 'ERROR' }));
            ev.target.parentElement.classList.add('border-input-error');
          } else {
            
            if(convertValue > 12){
              setFormData((prevFormData) => ({ ...prevFormData, hm: 'ERR: Should <= 12' }));
            ev.target.parentElement.classList.add('border-input-error');
            } else {
              setFormData((prevFormData) => ({ ...prevFormData, hm: totalHmValue }));
              const inputErrorClassList = ev.target.parentElement.classList;
              if (inputErrorClassList.contains('border-input-error')) {
                inputErrorClassList.remove('border-input-error');
              }
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
      if(name === 'shift'){
        toLocalStorage('shift', value)
      }
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleTab = () => {
    const lastPart = getURLPath()
    setActiveTab(lastPart)
    switch (lastPart) {
      case tabMenuTimeEntryEnum.UNIT_DIGGER:
        setFormTitle(HeaderTitle.FORM_UNIT_DIGGER)
        break;
      case tabMenuTimeEntryEnum.UNIT_HAULER:
        setFormTitle(HeaderTitle.FORM_UNIT_HAULER)
        break;
      case tabMenuTimeEntryEnum.UNIT_SUPPORT:
        setFormTitle(HeaderTitle.FORM_UNIT_SUPPORT)
        break;
      default:
        break;
    }

    setIsNew(true)
    getDataFirst()
    setTotalDuration(0)
    jRef.current.jspreadsheet.setData([])
  }

  const getDataFirst = useCallback(() => {
    const user = JSON.parse(Cookies.get('user'))
    const genId = generateID()
    setFormData(prevFormData => ({
      ...prevFormData,
      tanggal: new Date(),
      site: "BCP",
      shift: "Day",
      stafEntry: `${user.fullname} (${user.JDE})`,
      formID: genId
    }))
  }, [])

  useEffect(() => {
    const sorted = sortArray(unitOptions)
    setSortedUnitOptions(sorted)
    setMenuTabs(menuTabsTimeEntry)
    setFormTitle(HeaderTitle.FORM_UNIT_SUPPORT)
    const disabled =
      parseFloat(totalDuration) > 12 || parseFloat(totalDuration) < 12
        ? true
        : false
    setButtonDisabled(disabled)

    if (isNew) {
      getDataFirst()
      toLocalStorage('shift', 'Day')
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalDuration, isNew, unitOptions]);

  const handleEditData = useCallback(async (itemId) => {
    setDataItemId(itemId)
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
        type: 'RadioButton',
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
        options: sortedUnitOptions
      },
      {
        name: 'hmAwal',
        grid: 'col-2',
        label: 'HM Awal',
        value: formData.hmAwal,
        readOnly: false,
        disabled: false,
        type: 'Input',
        placeholder: 'eg: 11.123,10'
      },
      {
        name: 'hmAkhir',
        grid: 'col-2',
        label: 'HM Akhir',
        value: formData.hmAkhir,
        readOnly: false,
        disabled: false,
        type: 'Input',
        placeholder: 'eg: 11.123,10'
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
        name: 'note',
        grid: 'col-6',
        label: 'Note',
        value: "Mohon lengkapi form berikut, dan pastikan durasi total 12 jam, jika durasi < 12 jam, data hanya dapat disimpan sebagai 'Draft'. Dan pastikan nilai 'End Time' > 'Start Time'.",
        type: 'StaticInfo'
      }
    ],
    [formData, shiftOptions, sortedUnitOptions]
  )

  return (
    <>
      <HeaderPageForm
        title={formTitle}
        urlCreate={''}
        urlBack={NavigateUrl.TIME_ENTRY_MAIN_TABLE}
        childrenMenu={<DynamicTablistMenu tabs={menuTabs} active={activeTab} handleTab={handleTab} />}
        icon={<Form28Regular />}
      />
      <div className='form-wrapper'>
        <Suspense fallback={<></>}>
          <FormComponent handleChange={handleChange} components={components} />
        </Suspense>

        <div ref={jRef} className='mt1em' />
        <div className='row mt1em'>
          <div className='col-6 flex-row'>
            <h5> Total Time Duration: {totalDuration}</h5>
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
              buttonDraftDisabled={buttonDraftDisabled}
            />
          </div>
        </div>
      </div>
      <div className="mt1em form-wrapper">
        <Suspense fallback={<></>}>
          <TableDataValidated
            formTitle={formTitle}
            loaded={loaded}
            setLoaded={setLoaded}
            handleEdit={handleEditData}
            handleSubmitToServer={handleSubmitToServer}
            sendingData={sendingData}
          />
          
          <TableDraft 
            formTitle={formTitle}
            loaded={loaded}
            setLoaded={setLoaded}
            handleEdit={handleEditData}
            sendingData={sendingData}
          />
        </Suspense>
      </div>
      <DialogComponent open={openDialog} setOpen={setOpenDialog} title={dialogTitle} message={dialogMessage} />
    </>
  )
}
