import React, { useState, useEffect } from 'react';
import NavTop from "../../components/NavTop";
import DynamicPageHeader from "../../components/Breadcrumbs";
import { EuiCard, EuiSpacer, EuiText, EuiFormRow, EuiFieldText, EuiCheckbox, EuiFlexGrid, EuiRadio, EuiFlexItem, EuiDatePicker, EuiButton, EuiFieldSearch, EuiSelect } from "@elastic/eui";
import DynamicTabs from "../../components/Tablist";
import './style.css';
import DynamicRadioGroup from '../../components/Radio';
import moment from "moment";
import stationsServices from "../../services/stationDashboard"
import reportService from '../../services/reportService';
import { URL_API } from '../../utils/Enums';

const ReportFuel = () => {
  const [checkedItems, setCheckedItems] = useState({});
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [station, setStation] = useState([])
  const [selectedStations, setSelectedStations] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("")
  const [selectedId, setSelectedId] = useState(""); 
  const [selectedOption, setSelectedOption] = useState('Excel');
  const initialDate = moment().format('YYYY-MM-DD')
  const [firstDate, setFirstDate] = useState(initialDate)
  const [lastDate, setLastDate] = useState(initialDate)


  const initialDaily = moment().format('YYYY-MM-DD')
  const [dailyDate, setDailyDate] = useState(initialDaily)
  const [endDaily, setendDaily] = useState(moment())
  const [selectedIdDaily, setSelectedIdDaily] = useState("")
  const [selectedOptDaily, setselectedOptDaily] = useState("Consumtion")

  const breadcrumbs = [
    {
      text: 'Dashboard',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
    {
      text: '',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
  ];

  const radioOptions = [
    { id: 1, label: 'All'},
    { id: 2,label: 'Issued And Transfer' },
    { id: 3,label: 'Receipt Only' },
    { id: 4,label: 'Issued Only' },
    { id: 5,label: 'Receipt KPC Only' },
  ];

  const radioOptionsDaily = [
    { id: 1, label: 'Fuel Consumption', values: 'Consumtion'},
    { id: 2,label: 'Fuel Consumption (with shift)', values: 'Shift' },
    { id: 3,label: 'Summary Receipt KPC', values: 'KPC' },
    { id: 4,label: 'Fuel Consumption (with HM KM)', values: 'HMKM' },
    { id: 5,label: 'Fuel Consumption (By Owner)', values: 'Owner' },
  ];

  const reports = [
    { id: 1, label: 'Export to Excel', value: 'Excel'},
    { id: 2,label: 'Export to Elipse', value: 'Elipse' },
    { id: 3,label: 'Export Raw', value:'Raw' },
  ];

  const stationData =  station.map((item, index) => ({
    id: index + 1,
    label: item 
  }));

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await stationsServices.getStation();
        if (res.status !== "200") {
          throw new Error('Network response was not ok');
        } else if (res.status === 404) {
          setStation([]);
        } else {
          setStation(prevStation => {
            if (JSON.stringify(prevStation) !== JSON.stringify(res.data)) {
              const fuelStationNames = res.data.map(item => item.fuel_station_name);
              return fuelStationNames;
            }
            return prevStation;
          });
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
  
    fetchTable();
  }, []);

  const onChange = (event) => {
    const { value, checked } = event.target;
    setCheckedItems(prevState => ({
      ...prevState,
      [value]: checked
    }));
    if (checked) {
      const items = stationData.find(item => item.id === parseInt(value));
      if (items) {
        setSelectedStations(prevSelected => [...prevSelected, items.label]);
      }
    } else {
      setSelectedStations(prevSelected => prevSelected.filter(station => station !== stationData.find(item => item.id ===  parseInt(value))?.label));
    }
  };

  const onSelectAllChange = (event) => {
    const { checked } = event.target;
    setIsAllChecked(checked);
    const updatedCheckedItems = stationData.reduce((acc, item) => {
      acc[item.id] = checked;
      return acc;
    }, {});
    setCheckedItems(updatedCheckedItems);
    setSelectedStations([])
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    setFirstDate(moment(date).format('YYYY-MM-DD'))
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setLastDate(moment(date).format('YYYY-MM-DD'))
  };

  const handleRadioChange = (event) => {
    const selectedId = Number(event.target.value);
    setSelectedId(selectedId); 
    const selectedOption = radioOptions.find(option => option.id === selectedId);
    if (selectedOption) {
      setSelectedRadio(selectedOption.label);
    }
  };

const handleRadioDaily = (event) => {
  const optDaily = Number(event.target.value);
  setSelectedIdDaily(optDaily);

  
  const selectedOptions = radioOptionsDaily.find(option => option.id === optDaily)

  if (selectedOptions) {
    setselectedOptDaily(selectedOptions.values);
  }
};


  const handleOptionReport = (event) =>{
    setSelectedOption(event.target.value)
  }

  const handleExport = async () => {
    try {
      const data = {
        tanggalFrom: firstDate,
        tanggalTo: lastDate,
        station: selectedStations,
        type: selectedRadio,
        option: selectedOption
    }
      const response = await reportService.getReportLkfs(data);
      if (response.status === "200") { 
        const reportLink = response.link;
        // setTimeout(()=>{},3000)
        setTimeout(()=>{
          window.location.href = URL_API.generateReport + reportLink
        },5000)
        window.location.href = URL_API.generateReport + reportLink
      } else {
        console.log(`Gagal mendapatkan laporan: ${response.status}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan ekspor:", error);
    }
  }

  const handleDailyChange = (date) => {
    setendDaily(date);
    setDailyDate(moment(date).format('YYYY-MM-DD'))
  };

  const handleExportDaily = async () => {
    try {
      const data = {
        untilDate: dailyDate,
        option: selectedOptDaily
      }
      const response = await reportService.generateReportDaily(data);
      if (response.status === "200") { 
        const reportLink = response.link;
        setTimeout(()=>{
          window.location.href = URL_API.generateReport + reportLink
        },5000)
      } else {
        console.log(`Gagal mendapatkan laporan: ${response.status}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan ekspor:", error);
    }
  }


  const defaultSelectedId = 'radioGroupItem_1';

  const tabs = [
    {
      id: 'lfk--id',
      name: 'Export LKF',
      content: (
        <>
        <div className='mt20'>
        <EuiCard className="cardContainer">
            <div className="formRowContainer">
              <EuiFlexGrid>
                <EuiFormRow  style={{marginTop:"0px"}} label="Mulai pada tanggal">
                    <EuiDatePicker fullWidth 
                      selected={startDate}
                      onChange={handleStartDateChange}
                      dateFormat="DD/MM/YYYY"
                      locale="en-gb"
                    />
                </EuiFormRow>
              </EuiFlexGrid>
              <EuiFormRow  style={{marginTop:"0px"}} label="Sampai pada tanggal">
                  <EuiDatePicker  fullWidth
                    selected={endDate}
                    onChange={handleEndDateChange}
                    dateFormat="DD/MM/YYYY"
                    locale="en-gb"
                  />
              </EuiFormRow>
            </div>

            <EuiFlexGrid className='mt20'>
              <EuiFormRow>
                <EuiCheckbox
                  id="selectAll"
                  label={<span className="all">All Station</span>}
                  checked={isAllChecked}
                  onChange={onSelectAllChange}
                />
              </EuiFormRow>
            </EuiFlexGrid>
            <div className="checkbox-content">
              {stationData.map(item => (
                <EuiFormRow key={item.id} className="euiFormRow">
                  <EuiCheckbox
                    value={item.id}
                    label={<span className="checkboxLabel">{item.label}</span>}
                    checked={!!checkedItems[item.id]}
                    onChange={onChange}
                  />
                </EuiFormRow>
              ))}
             
            </div>

            <div className="checkbox-content">
              <EuiFlexGrid  columns={3} gutterSize="xs">
                {radioOptions.map(option => (
                  <div key={option.id} style={{ textAlign: 'left', margin:'10px', display: 'flex' }}>
                    <input
                      type="radio"
                      id={`radio-${option.id}`} 
                      name="dynamicRadioGroup" 
                      value={option.id} 
                      checked={selectedId === option.id}
                      onChange={handleRadioChange} 
                    />
                    <label htmlFor={`radio-${option.id}`} style={{ marginLeft: '5px' }}>{option.label}</label>
                  </div>
                ))}
              </EuiFlexGrid>
            </div>

            <div className='checkbox-content'>
              <EuiSelect fullWidth
              options={reports}
              onChange={handleOptionReport}
              ></EuiSelect>
            </div>
            

            <EuiButton
                  size="s"
                  style={{
                    background: "#73A33F",
                    color: "white",
                    width: "100px",
                    textAlign:"center",
                    float:"inline-end",
                    marginTop:"40px"
                  }}
                 onClick={handleExport}
                >
                  <div>Create Report</div>
            </EuiButton>
          </EuiCard>
          
        </div>
          
        </>
      ),
    },
    {
      id: 'daily--id',
      name: 'Daily Report',
      content: (
        <>
        <div className='mt20'>
        <EuiCard className="cardContainer">
            <div className="formRowContainer">
              <EuiFlexGrid>
                <EuiFormRow  style={{marginTop:"0px"}} label="Sampai tanggal">
                    <EuiDatePicker fullWidth 
                      selected={endDaily}
                      onChange={handleDailyChange}
                      dateFormat="DD/MM/YYYY"
                      locale="en-gb"
                    />
                </EuiFormRow>
              </EuiFlexGrid>
            </div>

            <div className="checkbox-content">
              <EuiFlexGrid  columns={1} gutterSize="xs"> Pili jenis report yang diinginkan :
                {radioOptionsDaily.map(option => (
                  <div key={option.id} style={{ textAlign: 'left', margin:'10px', display: 'flex' }}>
                    <input
                      type="radio"
                      id={`radio-${option.id}`} 
                      name="dynamicRadioGroup" 
                      value={option.id} 
                      checked={selectedIdDaily === option.id}
                      onChange={handleRadioDaily} 
                    />
                    <label htmlFor={`radio-${option.id}`} style={{ marginLeft: '5px' }}>{option.label}</label>
                  </div>
                ))}
              </EuiFlexGrid>
            </div>

            <EuiButton
                  size="s"
                  style={{
                    background: "#73A33F",
                    color: "white",
                    width: "100px",
                    textAlign:"center",
                    float:"inline-end",
                    marginTop:"40px"
                  }}
                 onClick={handleExportDaily}
                >
                  <div>Create Report</div>
            </EuiButton>
          </EuiCard>
          
        </div>
        </>
      ),
    },
  ];
  

  return (
    <>
      <NavTop />
      <div className="padding-content">
        <DynamicPageHeader
          pageTitle="Report LFK"
          breadcrumbs={breadcrumbs}
          pageTitleStyle={{ color: '#6a6a6a', fontSize: '24px' }}
        />
        <DynamicTabs
          tabs={tabs}
          initialSelectedTabId="lfk--id"
        />

      </div>
    </>
  );
}

export default ReportFuel;
