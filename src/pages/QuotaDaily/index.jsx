import React, { useEffect, useState } from "react";
import Navtop from "../../components/NavTop";
// import CardContent from "./widget";
import {
  EuiPanel,
  EuiFlexGrid,
  EuiFlexItem,
  EuiText,
  EuiButton,
  EuiDatePicker,
  EuiSelect
} from "@elastic/eui";
import moment from "moment";
import TableData from "./table";

const QuotaDailyPage = () => {
  const storedDate = JSON.parse(localStorage.getItem('optionLimited')) || {};
  // const initialDate = storedDate.tanggal ? moment(storedDate.tanggal) : moment().format('YYYY-MM-DD')
  const initialDate = moment(storedDate.tanggal)
  const [selectDate, setSelectDate] = useState(initialDate);
  const [selectedOption, setSelectedOption] = useState('Daily');
  const [opt, setOpt] = useState({tanggal: moment(initialDate).format('YYYY-MM-DD'), option: selectedOption})

  const breadcrumbs = [
    {
      text: 'Dashboard',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
    {
      text: 'Unit Request',
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
  ];

  const options = [
    { value: 'Daily', text: 'Daily' },
    // { value: 'Weekly', text: 'Weekly' },
    // { value: 'Montly', text: 'Montly' },
    // { value: 'YTD', text: 'YTD' },
  ];
  
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setSelectDate(date);
  };

  const formattedDateReq = moment(selectDate).format('dddd, DD-MM-YYYY');
  const formattedDatesReq = moment(selectDate).format('YYYY-MM-DD');
  
  localStorage.setItem("optionLimited", JSON.stringify(opt))

  const handleSaveData = () => {
    setOpt({tanggal: formattedDatesReq, option: selectedOption})
  }

  return (
    <>
      <div className="content-padding">
        <EuiFlexGrid columns={4}>
          <EuiFlexItem>
            <EuiText paddingsize="l">
              <div className="summary">Limited Quota</div>
              <div style={{marginTop:"10px"}} className="date">{formattedDateReq}</div>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText paddingsize="l"></EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText paddingsize="l"></EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGrid columns={4}>
              <EuiFlexItem>
                <EuiDatePicker
                  className="date-picker"
                  selected={selectDate}
                  onChange={handleStartDateChange}
                  dateFormat="DD/MM/YYYY"  
                  locale="en-gb" 
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <div>
                  <EuiSelect style={{width:"200px"}}
                    options={options}
                    value={selectedOption}
                    onChange={handleChange}
                    aria-label="Select "
                  />
                </div>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButton
                  size="s"
                  style={{
                    marginTop:"3px",
                    background: "#73A33F",
                    color: "white",
                    width: "100px",
                  }}
                  onClick={handleSaveData}
                >
                  <div>Select</div>
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGrid>
          </EuiFlexItem>
        </EuiFlexGrid>
        {/* <div style={{ marginTop: "20px" }}>
          <CardContentQouta/>
        </div> */}
        <div className="mt20">
          <EuiFlexGrid columns={2}>
          </EuiFlexGrid>
        </div>
        <div className="mt20">
          <TableData opt={opt}/>
        </div>
      </div>
    </>
  );
};

export default QuotaDailyPage;
