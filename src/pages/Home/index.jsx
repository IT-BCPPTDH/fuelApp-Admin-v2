import React, { useState,useEffect } from "react";
import Navtop from "../../components/NavTop";
import CardContent from "./widget";
import {
  EuiPanel,
  EuiFlexGrid,
  EuiFlexItem,
  EuiText,
  EuiButton,
  EuiDatePicker,
  EuiSelect,
} from "@elastic/eui";
import moment from "moment";
import TableData from "./table";
import { useAtom } from "jotai";
import { option } from "../../helpers/generalState"
import MainService from "../../services/HomeData";

const HomePage = () => {

  const storedDate = JSON.parse(localStorage.getItem('formattedOption')) || {};
  const initialDate = storedDate.tanggal ? moment(storedDate.tanggal) : moment()
  const initialOpt = storedDate.option ? storedDate.option : 'Daily'

  const [selectDate, setSelectDate] = useState(initialDate);
  const [selectedOption, setSelectedOption] = useState(initialOpt);
  const [opt, setOpt] = useState({ tanggal: initialDate, option: initialOpt });
  const handleChageDate = (date) => {
    setSelectDate(date);
  };

  const options = [
    { value: 'Daily', text: 'Daily' },
    { value: 'Weekly', text: 'Weekly' },
    { value: 'Montly', text: 'Montly' },
    { value: 'YTD', text: 'YTD' },
  ];
  
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const formattedDate = moment(selectDate).format('dddd, DD-MM-YYYY');
  const formattedDates = moment(selectDate).format('YYYY-MM-DD');
  // localStorage.setItem("tanggal", JSON.stringify(formattedDates))
  localStorage.setItem("formattedOption", JSON.stringify(opt))

  const handleOption = () => {
    setOpt({tanggal: formattedDates, option: selectedOption})
  }


  useEffect(() => {
    if (!storedDate.tanggal) {
      setSelectDate(moment());
    }
  }, []);


  return (
    <>
      <div className="content-padding">
        <EuiFlexGrid columns={4}>
          <EuiFlexItem>
            <EuiText paddingsize="l">
              <div className="summary">Fuel Summary</div>
              <div className="date">{formattedDate}</div>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText paddingsize="l"></EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText paddingsize="l"></EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGrid columns={3}>
              <EuiFlexItem>
                <EuiDatePicker
                  className="date-picker"
                  selected={selectDate}
                  onChange={handleChageDate}
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
                    background: "#73A33F",
                    color: "white",
                    width: "100px",
                  }}
                  onClick={handleOption}
                >
                  <div>Select</div>
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGrid>
          </EuiFlexItem>
        </EuiFlexGrid>
        <div style={{ marginTop: "20px" }}>
          <CardContent />
        </div>
        <div className="mt20">
          <EuiFlexGrid columns={2}>
            <EuiFlexItem>
              <EuiText paddingsize="l">
                <div className="summary">Fuel Station Summary</div>
              </EuiText>
              <EuiText>
                <div className="note-summary">Notes for validation:</div>
                <div className="note-summary">
                  <div>Close Data = Open Stock + Receipt KPC + Receipt - Issued - Transfer</div>
                  <div>* Variant = Close Sonding - Close Data</div>
                  <div>* Intershift O/C Variance = Opening Stock Current Shift - Closing Stock Previous Shift</div>
                </div>
              </EuiText>
            </EuiFlexItem>
          </EuiFlexGrid>
        </div>
        <div className="mt20">
          <TableData />
        </div>
      </div>
    </>
  );
};

export default HomePage;
