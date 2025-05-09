import React, { useState, useEffect } from 'react';
import NavTop from "../../components/NavTop";
import DynamicPageHeader from "../../components/Breadcrumbs";
import {
  EuiCard,
  EuiSpacer,
  EuiText,
  EuiFormRow,
  EuiFieldText,
  EuiCheckbox,
  EuiFlexGrid,
  EuiRadio,
  EuiFlexItem,
  EuiDatePicker,
  EuiButton,
  EuiFieldSearch,
  EuiSelect,
  EuiModal, // <-- Tambahkan ini
  EuiModalBody, // <-- Tambahkan ini
  EuiModalHeader, // <-- Tambahkan ini
  EuiModalHeaderTitle, // <-- Tambahkan ini
  EuiOverlayMask, // <-- Tambahkan ini
  EuiProgress, // <-- Tambahkan ini
  EuiGlobalToastList, // <-- Tambahkan ini
} from "@elastic/eui";
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
  const [selectedId, setSelectedId] = useState(1); // Default ke 'All'
  const [selectedOption, setSelectedOption] = useState('Excel');
  const initialDate = moment().format('YYYY-MM-DD')
  const [firstDate, setFirstDate] = useState(initialDate)
  const [lastDate, setLastDate] = useState(initialDate)

  const initialDaily = moment().format('YYYY-MM-DD')
  const [dailyDate, setDailyDate] = useState(initialDaily)
  const [endDaily, setendDaily] = useState(moment())
  const [selectedIdDaily, setSelectedIdDaily] = useState(1); // Default ke 'Fuel Consumption'
  const [selectedOptDaily, setselectedOptDaily] = useState("Consumtion")

  // State untuk loading modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("Generating report, please wait...");

  // State untuk toasts (notifikasi)
  const [toasts, setToasts] = useState([]);
  let toastId = 0;

  useEffect(() => { // Set default selectedRadio saat komponen mount
    const defaultRadioOption = radioOptions.find(option => option.id === selectedId);
    if (defaultRadioOption) {
      setSelectedRadio(defaultRadioOption.label);
    }
    const defaultRadioOptionDaily = radioOptionsDaily.find(option => option.id === selectedIdDaily);
    if (defaultRadioOptionDaily) {
      setselectedOptDaily(defaultRadioOptionDaily.values);
    }
  }, []); // Jalankan sekali saat mount


  const breadcrumbs = [
    {
      text: 'Dashboard',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
    {
      text: 'Report Fuel', // Menambahkan nama halaman saat ini
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
    { id: 1, text: 'Export to Excel', value: 'Excel'},
    { id: 2,text: 'Export to Elipse', value: 'Elipse' },
    { id: 3,text: 'Export Raw', value:'Raw' },
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
        addErrorToast("Failed to fetch stations.", error.message);
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
    if (checked) {
      setSelectedStations(stationData.map(s => s.label));
    } else {
      setSelectedStations([]);
    }
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
    const selectedIdValue = Number(event.target.value);
    setSelectedId(selectedIdValue);
    const selectedOption = radioOptions.find(option => option.id === selectedIdValue);
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

  // Fungsi untuk menampilkan dan menyembunyikan modal
  const showModal = (message = "Generating report, please wait...") => {
    setModalMessage(message);
    setIsModalVisible(true);
  };
  const closeModal = () => setIsModalVisible(false);

  // Fungsi untuk menambahkan toast
  const addSuccessToast = (title, text) => {
    setToasts(toasts.concat({
      id: (toastId++).toString(),
      title,
      text,
      color: "success",
      iconType: "check",
    }));
  };

  const addErrorToast = (title, text) => {
    setToasts(toasts.concat({
      id: (toastId++).toString(),
      title,
      text,
      color: "danger",
      iconType: "alert",
    }));
  };

  const removeToast = (removedToast) => {
    setToasts(toasts.filter((toast) => toast.id !== removedToast.id));
  };

  const handleExport = async () => {
    if (!isAllChecked && selectedStations.length === 0) {
      addErrorToast("Validation Error", "Please select at least one station or check 'All Station'.");
      return;
    }
    if (!selectedRadio) {
      addErrorToast("Validation Error", "Please select a report type.");
      return;
    }

    showModal("Generating LKF Report...");
    try {
      const data = {
        tanggalFrom: firstDate,
        tanggalTo: lastDate,
        station: isAllChecked ? ["ALL"] : selectedStations, // Kirim ["ALL"] jika isAllChecked
        type: selectedRadio,
        option: selectedOption
      }
      const response = await reportService.getReportLkfs(data);
      // setTimeout untuk simulasi proses server yang mungkin butuh waktu
      setTimeout(async () => {
        if (response.status === "200" && response.link) {
          try {
            // Mencoba memulai download
            // Ini adalah best-effort, karena kita tidak bisa tahu pasti dari JS murni apakah download benar-benar berhasil
            // atau dibatalkan pengguna, atau gagal karena network di sisi client.
            window.location.href = URL_API.generateReport + response.link;
            closeModal();
            // Anggap download berhasil dimulai jika tidak ada error
            addSuccessToast("Download Started", "LKF Report download has been initiated successfully.");
          } catch (downloadError) {
            console.error("Error initiating download:", downloadError);
            closeModal();
            addErrorToast("Download Failed", "Could not start the LKF report download. Please try again.");
          }
        } else {
          closeModal();
          addErrorToast("Report Generation Failed", `Failed to generate LKF report: ${response.message || 'Unknown error'}`);
          console.log(`Gagal mendapatkan laporan: ${response.status} - ${response.message}`);
        }
      }, 3000); // Waktu tunggu sebelum mencoba download, sesuaikan jika perlu

    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan ekspor LKF:", error);
      closeModal();
      addErrorToast("Export Error", "An unexpected error occurred during LKF report export.");
    }
  }

  const handleDailyChange = (date) => {
    setendDaily(date);
    setDailyDate(moment(date).format('YYYY-MM-DD'))
  };

  const handleExportDaily = async () => {
    if (!selectedOptDaily) {
        addErrorToast("Validation Error", "Please select a daily report type.");
        return;
      }

    showModal("Generating Daily Report...");
    try {
      const data = {
        untilDate: dailyDate,
        option: selectedOptDaily
      }
      const response = await reportService.generateReportDaily(data);
       // setTimeout untuk simulasi proses server yang mungkin butuh waktu
       setTimeout(async () => {
        if (response.status === "200" && response.link) {
          try {
            window.location.href = URL_API.generateReport + response.link;
            closeModal();
            addSuccessToast("Download Started", "Daily Report download has been initiated successfully.");
          } catch (downloadError) {
            console.error("Error initiating download:", downloadError);
            closeModal();
            addErrorToast("Download Failed", "Could not start the Daily report download. Please try again.");
          }
        } else {
          closeModal();
          addErrorToast("Report Generation Failed", `Failed to generate Daily report: ${response.message || 'Unknown error'}`);
          console.log(`Gagal mendapatkan laporan harian: ${response.status} - ${response.message}`);
        }
      }, 3000); // Waktu tunggu

    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan ekspor harian:", error);
      closeModal();
      addErrorToast("Export Error", "An unexpected error occurred during Daily report export.");
    }
  }

  const tabs = [
    {
      id: 'lfk--id',
      name: 'Export LKF',
      content: (
        <>
        <div className='mt20'>
        <EuiCard className="cardContainer" title="">
            <div className="formRowContainer">
              <EuiFlexGrid columns={2} gutterSize="l">
                <EuiFlexItem>
                  <EuiFormRow label="Mulai pada tanggal">
                      <EuiDatePicker fullWidth
                        selected={startDate}
                        onChange={handleStartDateChange}
                        dateFormat="DD/MM/YYYY"
                        locale="en-gb"
                        maxDate={endDate} // Mencegah start date > end date
                      />
                  </EuiFormRow>
                </EuiFlexItem>
                <EuiFlexItem>
                  <EuiFormRow label="Sampai pada tanggal">
                      <EuiDatePicker  fullWidth
                        selected={endDate}
                        onChange={handleEndDateChange}
                        dateFormat="DD/MM/YYYY"
                        locale="en-gb"
                        minDate={startDate} // Mencegah end date < start date
                      />
                  </EuiFormRow>
                </EuiFlexItem>
              </EuiFlexGrid>
            </div>
            <EuiSpacer size="m"/>
            <EuiFormRow>
              <EuiCheckbox
                id="selectAll"
                label={<span className="all">All Station</span>}
                checked={isAllChecked}
                onChange={onSelectAllChange}
              />
            </EuiFormRow>
            <EuiSpacer size="s"/>
            <div className="checkbox-content">
              <EuiFlexGrid columns={3} gutterSize="s" responsive={false}>
                {stationData.map(item => (
                  <EuiFlexItem key={item.id} grow={false}>
                    <EuiCheckbox
                    id={`checkbox-${item.id}`}
                      value={item.id.toString()}
                      label={<span className="checkboxLabel">{item.label}</span>}
                      checked={isAllChecked ? true : !!checkedItems[item.id]} // Jika All Station, semua checked
                      onChange={onChange}
                      disabled={isAllChecked} // Disable jika All Station checked
                    />
                  </EuiFlexItem>
                ))}
              </EuiFlexGrid>
            </div>
            <EuiSpacer size="l"/>
            <EuiFormRow label="Pilih Jenis Laporan:">
              <EuiFlexGrid columns={3} gutterSize="s" responsive={false}>
                  {radioOptions.map(option => (
                    <EuiFlexItem key={option.id} grow={false}>
                      <EuiRadio
                        id={`radio-lfk-${option.id}`}
                        name="lfkRadioGroup"
                        label={option.label}
                        value={option.id.toString()}
                        checked={selectedId === option.id}
                        onChange={handleRadioChange}
                      />
                    </EuiFlexItem>
                  ))}
              </EuiFlexGrid>
            </EuiFormRow>
            <EuiSpacer size="l"/>
            <EuiFormRow label="Pilih Format Export:">
              <EuiSelect fullWidth
              options={reports.map(r => ({ value: r.value, text: r.text }))}
              value={selectedOption}
              onChange={handleOptionReport}
              />
            </EuiFormRow>
            <EuiSpacer size="xl"/>
            <EuiFlexGrid justifyContent="flexEnd">
                <EuiFlexItem grow={false}>
                    <EuiButton
                        fill
                        size="s"
                        style={{
                          background: "#73A33F",
                          color: "white",
                          width: "200px",
                          textAlign:"center",
                          float:"inline-end",
                          // marginTop:"20px"
                        }}
                        onClick={handleExport}
                        >
                        Create LKF Report
                    </EuiButton>
                </EuiFlexItem>
            </EuiFlexGrid>
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
        <EuiCard className="cardContainer" title = "">
            <EuiFlexGrid columns={1} gutterSize="l">
                <EuiFlexItem>
                    <EuiFormRow label="Sampai tanggal">
                        <EuiDatePicker fullWidth
                        selected={endDaily}
                        onChange={handleDailyChange}
                        dateFormat="DD/MM/YYYY"
                        locale="en-gb"
                        />
                    </EuiFormRow>
                </EuiFlexItem>
            </EuiFlexGrid>
            <EuiSpacer size="l"/>
            <EuiFormRow label="Pilih jenis report yang diinginkan :">
              <EuiFlexGrid columns={1} gutterSize="s">
                {radioOptionsDaily.map(option => (
                  <EuiFlexItem key={option.id} grow={false}>
                    <EuiRadio
                      id={`radio-daily-${option.id}`}
                      name="dailyRadioGroup"
                      label={option.label}
                      value={option.id.toString()}
                      checked={selectedIdDaily === option.id}
                      onChange={handleRadioDaily}
                    />
                  </EuiFlexItem>
                ))}
              </EuiFlexGrid>
            </EuiFormRow>
            <EuiSpacer size="xl"/>
            <EuiFlexGrid justifyContent="flexEnd">
                <EuiFlexItem grow={false}>
                    <EuiButton
                        fill
                        size="s"
                        style={{
                            background: "#73A33F",
                            borderColor: "#73A33F",
                            minWidth: "150px",
                        }}
                        onClick={handleExportDaily}
                        >
                        Create Daily Report
                    </EuiButton>
                </EuiFlexItem>
            </EuiFlexGrid>
          </EuiCard>
        </div>
        </>
      ),
    },
  ];

  // Modal untuk loading
  let loadingModal;
  if (isModalVisible) {
    loadingModal = (
      <EuiOverlayMask>
        <EuiModal onClose={closeModal} style={{ width: '350px' }}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>
              Processing
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiProgress size="xs" color="success" />
            <EuiSpacer size="m" />
            <EuiText textAlign="center">
              <p>{modalMessage}</p>
            </EuiText>
          </EuiModalBody>
        </EuiModal>
      </EuiOverlayMask>
    );
  }


  return (
    <>
      <NavTop />
      <div className="padding-content">
        <DynamicPageHeader
          pageTitle="Report Fuel" // Mengganti jadi Report Fuel
          breadcrumbs={breadcrumbs}
          pageTitleStyle={{ color: '#6a6a6a', fontSize: '24px' }}
        />
        <DynamicTabs
          tabs={tabs}
          initialSelectedTabId="lfk--id"
        />
      </div>
      {loadingModal}
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={removeToast}
        toastLifeTimeMs={6000} // Notifikasi hilang setelah 6 detik
      />
    </>
  );
}

export default ReportFuel;