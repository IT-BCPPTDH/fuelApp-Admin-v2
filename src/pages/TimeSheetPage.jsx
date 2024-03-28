import { useRef, useEffect, useCallback, useState, useMemo, lazy, Suspense } from 'react'
import jspreadsheet from 'jspreadsheet-ce'
import { Form28Regular } from '@fluentui/react-icons'
import { DynamicTablistMenu } from '../components/Tablist'
import Cookies from 'js-cookie'
import { getLocalStorage, sortArray, toLocalStorage } from '../helpers/toLocalStorage'
import { HeaderPageForm } from '../components/FormComponent/HeaderPageForm'
import {
  calculateTotalTimeFromArray, formatTime, calculateTotalTime, calculateAndConvertDuration,
  convertToAMPM, calculateMidnightTime, calculateDifference, checkValidHMAkhir, convertTime, convertToUTC
} from '../helpers/timeHelper'
import { FooterPageForm } from '../components/FormComponent/FooterPageForm'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../models/db'
import { NavigateUrl } from '../utils/Navigation'
import { menuTabsTimeEntry } from '../helpers/menuHelper'
import { shiftOptionsData, materialOptions, getExcaOptions, cutStatusOptions, locationOptions, panelOptions, getOperatorOptions } from '../helpers/optionHelper'
import { tabMenuTimeEntryEnum } from '../utils/Enums'
import { hasValuesInNestedArray } from '../helpers/formFieldHelper'
import { getURLPath, generateID } from '../helpers/commonHelper'
import Services from '../services/timeEntry'
import { insertTimeEntry, insertTimeEntryDraft } from '../helpers/indexedDB/insert'
import { getTimeEntryDetailById, getTimeEntryDraftDetailById, getTimeEntryByUnit, getUnitDataByNo, getOperatorNameById, getTimeEntryDraftByUnit } from '../helpers/indexedDB/getData'
import { DialogComponent } from '../components/Dialog'
import { deleteTimeEntries, deleteTimeEntriesDRAFT } from '../helpers/indexedDB/deteleData'
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
  const [checkSheetData, setCheckSheetData] = useState(null)

  useLiveQuery(() => db.activity.toArray())

  const [unitOptions] = useState(() => getLocalStorage('timeEntry-unit'));

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

  const checkFormCompleted = useCallback(() => {
    if (
      Object.prototype.hasOwnProperty.call(formData, 'hmAwal') &&
      Object.prototype.hasOwnProperty.call(formData, 'hmAkhir') &&
      Object.prototype.hasOwnProperty.call(formData, 'tanggal') &&
      Object.prototype.hasOwnProperty.call(formData, 'unitNo')
    ) {
      return true;
    }
    return false;
  }, [formData]);

  const updateSpreadsheet = (dataPrev, dataCurr,  columnIndex, rowIndex,spreadSheet) => {

    if (dataCurr === '' && dataPrev !== '' && dataPrev !== null && dataPrev !== undefined) {
      spreadSheet.updateCell(columnIndex, rowIndex, dataPrev, false);
    } else if (dataCurr !== '' && dataCurr !== dataPrev) {
      console.log("changed")
      spreadSheet.updateCell(columnIndex, rowIndex, dataCurr, false);
      const sizeLeft = rowIndex + 1
      console.log(sizeLeft)
      const next = spreadSheet.getValueFromCoords(columnIndex, sizeLeft)
      if(next !== ''){
        spreadSheet.updateCell(columnIndex, sizeLeft, dataCurr, false);
      }
    }
    else if (dataCurr == '' && dataCurr !== dataPrev) {
      spreadSheet.updateCell(columnIndex, rowIndex, '', false);
    }

  }

  const handleChangeSheet = useCallback(() => {
    const spreadSheet = jRef.current.jspreadsheet
    const masterActivity = getLocalStorage('timeEntry-masterAct')
    let startTime = null
    let endTime = null
    let arrayTime = []
    const shift = getLocalStorage('shift')
    let parsedStartTime = '0.0'

    for (let index = 0; index < 20; index++) {
      const col1Val = spreadSheet.getValueFromCoords(0, index)
      const activity = masterActivity?.find(obj => obj.activityname === col1Val)
      const descriptionActivity = activity?.delaydescription

      if (descriptionActivity) spreadSheet.updateCell(1, index, descriptionActivity, false)

      const colStartTime = spreadSheet.getValueFromCoords(2, index)
      let colEndTime = spreadSheet.getValueFromCoords(3, index)

      if(colEndTime){ 
        colEndTime = convertTime(colEndTime)
      }
     
      if (colStartTime) {
        startTime = formatTime(colStartTime);
        parsedStartTime = parseFloat(startTime);

        if (shift === 'Night') {
          if (parsedStartTime >= 6 && parsedStartTime < 18) {
            spreadSheet.updateCell(2, index, '', false);
            spreadSheet.updateCell(3, index, '', false);
            spreadSheet.updateCell(4, index, '', false);
            spreadSheet.updateCell(2, index + 1, '', false);
            colEndTime = null;
          } else {
            spreadSheet.updateCell(2, index, startTime, false);
          }

        } else if (shift === 'Day') {
          if (parsedStartTime > 17.59 || parsedStartTime < 6) {
            spreadSheet.updateCell(2, index, '', false);
            spreadSheet.updateCell(3, index, '', false);
            spreadSheet.updateCell(4, index, '', false);
            spreadSheet.updateCell(2, index + 1, '', false);
            colEndTime = null;
          } else {
            spreadSheet.updateCell(2, index, startTime, false);
          }
        }
      }

      if (colEndTime) {

        endTime = formatTime(colEndTime)
        let parsedEndTime = parseFloat(endTime);
      
        if (shift === 'Night') {
          if (parsedEndTime > 6 && parsedEndTime < 18) {
            // spreadSheet.updateCell(2, index, '', false);
            spreadSheet.updateCell(3, index, '', false);
            spreadSheet.updateCell(4, index, '', false);
            spreadSheet.updateCell(2, index + 1, '', false);
            colEndTime = null;
          } else {
            spreadSheet.updateCell(3, index, endTime, false);
          }

        } else if (shift === 'Day') {
          if (parsedEndTime > 18 || parsedEndTime < 6) {
            spreadSheet.updateCell(2, index, '', false);
            spreadSheet.updateCell(3, index, '', false);
            spreadSheet.updateCell(4, index, '', false);
            spreadSheet.updateCell(2, index + 1, '', false);
            colEndTime = null;
          } else {
            spreadSheet.updateCell(3, index, endTime, false);
          }
        }
      }

      if (colStartTime && colEndTime) {
        let result = calculateTotalTime(startTime, endTime)
        if (result !== 'NaN.NaN') {

          if (parseFloat(startTime) > parseFloat(endTime)) {
            if (shift === 'Night' && parsedStartTime >= 18.00 && parsedStartTime <= 23.59) {
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
          spreadSheet.updateCell(2, index + 1, colEndTime, false)
          if (parseFloat(startTime) > parseFloat(endTime)) {
            if (shift === 'Night' && parsedStartTime >= 18.00 && parsedStartTime <= 23.59) {
             
              spreadSheet.updateCell(2, index + 1, colEndTime, false)
            } else {
              spreadSheet.updateCell(2, index + 1, '', false);
            }
          } else {
            spreadSheet.updateCell(2, index + 1, colEndTime, false)
          }
        }
      }

      // const getDataActPrev = spreadSheet.getValueFromCoords(0, index-1)
      const getDataAct = spreadSheet.getValueFromCoords(0, index)
      const getDataMaterialPrev = spreadSheet.getValueFromCoords(5, index - 1)
      const getDataOperatorPrev = spreadSheet.getValueFromCoords(6, index - 1)
      const getDataCutStatusPrev = spreadSheet.getValueFromCoords(7, index - 1)
      const getDataDiggerPrev = spreadSheet.getValueFromCoords(8, index - 1)
      const getDataLokasiPrev = spreadSheet.getValueFromCoords(9, index - 1)
      const getDataPanelPrev = spreadSheet.getValueFromCoords(10, index - 1)
      const getDataMaterialCurr = spreadSheet.getValueFromCoords(5, index)
      const getDataOperatorCurr = spreadSheet.getValueFromCoords(6, index)
      const getDataCutStatusCurr = spreadSheet.getValueFromCoords(7, index)
      const getDataDiggerCurr = spreadSheet.getValueFromCoords(8, index)
      const getDataLokasiCurr = spreadSheet.getValueFromCoords(9, index)
      const getDataPanelCurr = spreadSheet.getValueFromCoords(10, index)

      if (getDataAct) {

        updateSpreadsheet(getDataMaterialPrev, getDataMaterialCurr, 5, index, spreadSheet);
        updateSpreadsheet(getDataOperatorPrev, getDataOperatorCurr, 6, index, spreadSheet);
        updateSpreadsheet(getDataCutStatusPrev, getDataCutStatusCurr, 7, index, spreadSheet);
        updateSpreadsheet(getDataDiggerPrev, getDataDiggerCurr, 8, index, spreadSheet);
        updateSpreadsheet(getDataLokasiPrev, getDataLokasiCurr, 9, index, spreadSheet);
        updateSpreadsheet(getDataPanelPrev, getDataPanelCurr, 10, index,spreadSheet);

      } else {
       // console.log(getDataActPrev)
  
        
      }
    }

    const datanya = spreadSheet.getData()
    setTableData(datanya)

    const totalDurationTime = calculateTotalTimeFromArray(arrayTime)
    setTotalDuration(totalDurationTime)

    const hasValue = hasValuesInNestedArray(datanya)
    setCheckSheetData(hasValue)
    const formCompleted = checkFormCompleted()

    if (hasValue && formCompleted) {
      setButtonDraftDisabled(false)

      const durationValidated =
        parseFloat(totalDurationTime) > 12 || parseFloat(totalDurationTime) < 12
          ? true
          : false

      setButtonDisabled(durationValidated)
    }

  }, [checkFormCompleted])

  useEffect(() => {
    const fetchData = async () => {
      let act = getLocalStorage('timeEntry-activity');
      const width = screen.width;
      const excaOptions = await getExcaOptions();
      const operatorOptions = await getOperatorOptions()
      const options = {
        data: [],
        columns: [
          { type: 'dropdown', width: '250', title: 'Activity', source: act, autocomplete: true },
          { type: 'text', width: '150', title: 'Delay Description' },
          { type: 'text', width: '100', title: 'Start' },
          { type: 'text', width: '100', title: 'End' },
          { type: 'text', width: '100', title: 'Duration' },
          { type: 'dropdown', width: '130', title: 'Material', source: materialOptions, autocomplete: true },
          { type: 'dropdown', width: '130', title: 'Operator', source: operatorOptions, autocomplete: true },
          { type: 'dropdown', width: '100', title: 'Cut Status', source: cutStatusOptions, autocomplete: true },
          { type: 'dropdown', width: '100', title: 'Digger', source: excaOptions, autocomplete: true },
          { type: 'dropdown', width: '100', title: 'Lokasi', source: locationOptions, autocomplete: true },
          { type: 'dropdown', width: '100', title: 'Panel', source: panelOptions, autocomplete: true }
        ],
        minDimensions: [9, 14],
        tableHeight: '375px',
        tableWidth: `${(width * 86) / 100}px`,
        tableOverflow: true,
        allowInsertColumn: false,
        onafterchanges: handleChangeSheet,
        allowExport: false,
        about: false
      };

      if (!jRef.current.jspreadsheet) {
        jspreadsheet(jRef.current, options);
      }
    };

    fetchData();

  }, [handleChangeSheet]);

  const handleSubmitToServer = useCallback(async (localData) => {
    try {
      const postData = (await Promise.all(localData.map(async (data) => {
        const transformedData = await transformData(data.activity);
        const unitData = await getUnitDataByNo(data.unitNo);
        const formTitle = data.formTitle.split(" ");
        const unitType = formTitle[formTitle.length - 1];
        const productionDate = convertToUTC(data.tanggal)

        return transformedData.map((activity) => ({
          formID: data.formID,
          unitNo: data.unitNo,
          productModel: unitData.type ?? '-',
          description: unitData.merk ? `${unitData.merk} ${unitData.category} ${unitData.type}` : '-',
          owner: unitData.owner ?? '-',
          productionDate: productionDate,
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
          unitType: unitType,
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

  const resetState = useCallback(() => {
    setLoaded(true);
    setIsNew(true);
    setFormData([]);
    setTotalDuration(0);
    jRef.current.jspreadsheet.setData([]);
    setButtonDraftDisabled(true)
    setButtonDisabled(true)
  }, []);

  const clearTime = (spreadSheet) => {
    for (let index = 0; index < 20; index++) {
      spreadSheet.getValueFromCoords(3, index + 1) && spreadSheet.updateCell(2, index + 1, '', false);
      spreadSheet.getValueFromCoords(3, index) && spreadSheet.updateCell(3, index, '', false);
      spreadSheet.getValueFromCoords(4, index) && spreadSheet.updateCell(4, index, '', false);
    }
  }

  const handleSubmitToLocalDB = useCallback(async (type) => {

    const data = {
      ...formData,
      activity: tableData,
      formTitle: formTitle,
      totalDuration: totalDuration
    };

    // Validated
    if (type === 1) {
      const checkExisted = await getTimeEntryByUnit(data.unitNo);
      if (checkExisted.length === 0) {
        const inserted = await insertTimeEntry(data);
        if (inserted) {
          resetState();
        }

        const checkDraftData = await getTimeEntryDraftByUnit(data.unitNo)
        if (checkDraftData.length > 0) {
          await deleteTimeEntriesDRAFT(checkDraftData[0].id)
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
      if (checkExisted.length === 0) {
        const inserted = await insertTimeEntryDraft(data)
        if (inserted) {
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

  }, [dataItemId, formData, formTitle, isNew, tableData, totalDuration, resetState])

  const handleChange = useCallback(async (ev, data) => {
    const { name, value } = data;

    if (name === 'hmAwal' || name === 'hmAkhir') {

      const isValidNumber = /^(\d+(\.\d{0,3})?)?(.\d{0,2})?$/.test(value);

      if (isValidNumber) {
        const formattedValue = value !== '' ? value : '';
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: formattedValue,
        }));

        if (name === 'hmAkhir') {
          const totalHmValue = calculateDifference(formData.hmAwal, formattedValue)
          const check = checkValidHMAkhir(formData.hmAwal, formattedValue)
          const convertValue = parseFloat(totalHmValue.toString().replace(',', '.'), 2)

          if (!check) {
            setFormData((prevFormData) => ({ ...prevFormData, hm: 'ERROR' }));
            ev.target.parentElement.classList.add('border-input-error');
          } else {

            if (convertValue > 12) {
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
    }
    else {
      if (name === 'shift') {
        toLocalStorage('shift', value)
        const spreadSheet = jRef.current.jspreadsheet

        if (value === "Day") {
          spreadSheet.updateCell(2, 0, '06.00.00', false);
          clearTime(spreadSheet)
        } else {
          spreadSheet.updateCell(2, 0, '18.00.00', false);
          clearTime(spreadSheet)
        }
      }

      if (name === 'unitNo') {
        if (value.length > 5) {
          const unit = await getUnitDataByNo(value)
          const unitModel = `${unit?.merk}-${unit?.type}`
          setFormData((prevFormData) => ({ ...prevFormData, ['model']: unitModel }));
        } else {
          setFormData((prevFormData) => ({ ...prevFormData, ['model']: '' }));
        }
      }

      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const formCompleted = checkFormCompleted()

    if (checkSheetData && formCompleted) {
      setButtonDraftDisabled(false)

      const durationValidated =
        parseFloat(totalDuration) > 12 || parseFloat(totalDuration) < 12
          ? true
          : false

      setButtonDisabled(durationValidated)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkFormCompleted, checkSheetData, totalDuration])

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
    const shift = getLocalStorage('shift')

    setFormData(prevFormData => ({
      ...prevFormData,
      site: "BCP",
      shift: shift ? shift : "Day",
      stafEntry: `${user.fullname} (${user.JDE})`,
      formID: genId
    }))
  }, [])

  useEffect(() => {
    const sorted = sortArray(unitOptions)
    setSortedUnitOptions(sorted)
    setMenuTabs(menuTabsTimeEntry)
    setFormTitle(HeaderTitle.FORM_UNIT_SUPPORT)

    if (isNew) {
      getDataFirst()
      const shift = getLocalStorage('shift')
      if (!shift) toLocalStorage('shift', 'Day')
    }

    setCheckSheetData(false)
    const formCompleted = checkFormCompleted()

    if (checkSheetData && formCompleted) {
      setButtonDraftDisabled(false)

      const durationValidated =
        parseFloat(totalDuration) > 12 || parseFloat(totalDuration) < 12
          ? true
          : false

      setButtonDisabled(durationValidated)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNew, unitOptions, totalDuration]);

  const handleEditData = useCallback(async (itemId, type) => {
    setDataItemId(itemId)
    setIsNew(false)
    const spreadSheet = jRef.current.jspreadsheet
    let dataDetail = null

    if (type === 1) {
      dataDetail = await getTimeEntryDetailById(itemId)
    } else {
      dataDetail = await getTimeEntryDraftDetailById(itemId)
    }

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
        grid: 'col-4',
        label: 'Note',
        value: `"Mohon isi form tervalidasi 12 jam, simpan sebagai 'Draft' jika kurang. Pastikan 'End Time' > 'Start Time'."`,
        type: 'StaticInfo'
      },
      {
        name: 'model',
        grid: 'col-2',
        label: 'Model',
        value: formData.model,
        readOnly: true,
        disabled: true,
        type: 'Input'
      },
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
                12 hours (INVALIDATED)
              </div>
            ) : (
              <div className='status-element status-validated'> 12 hours (Validated)</div>
            )}
          </div>
          <div className='col-6'>
            <FooterPageForm
              handleSubmit={handleSubmitToLocalDB}
              buttonDisabled={buttonDisabled}
              buttonDraftDisabled={buttonDraftDisabled}
              handleReset={resetState}
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
