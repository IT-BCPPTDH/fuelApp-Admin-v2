import React, { useState } from "react";
import Navtop from "../../components/NavTop";
import CardContent from "./widget";
import {
  EuiPanel,
  EuiFlexGrid,
  EuiFlexItem,
  EuiText,
  EuiButton,
  EuiDatePicker,
} from "@elastic/eui";
import moment from "moment";
import TableData from "./table";
import CardContentQouta from "./widget";

const RequestPage = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());
  const [dueDate, setDueDate] = useState(moment());
  const [selectDate, setSelectDate] = useState(moment());

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

  // Handle date range changes
  const handleStartDateChange = (date) => {
    setSelectDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  // Handle due date change
  const handleDueDateChange = (date) => {
    setDueDate(date);
  };

  // Function to check if the date range is valid
  const isDateRangeValid = () => {
    return startDate.isBefore(endDate) && endDate.isBefore(dueDate);
  };

  const formattedDateReq = moment(selectDate).format('dddd, DD-MM-YYYY');
  const formattedDatesReq = moment(selectDate).format('YYYY-MM-DD');
  localStorage.setItem("tanggalReq", JSON.stringify(formattedDateReq))
  localStorage.setItem("formattedDatesReq", JSON.stringify(formattedDatesReq))


  return (
    <>
      <div className="content-padding">
        <EuiFlexGrid columns={4}>
          <EuiFlexItem>
            <EuiText paddingSize="l">
              <div className="summary">Dashboard Unit Request</div>
              <div style={{marginTop:"10px"}} className="date">{formattedDateReq}</div>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText paddingSize="l"></EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText paddingSize="l"></EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGrid columns={2}>
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
                <EuiButton
                  size="s"
                  style={{
                    marginTop:"3px",
                    background: "#73A33F",
                    color: "white",
                    width: "100px",
                  }}
                  onClick={() => {
                    if (isDateRangeValid()) {
                      // Implement what should happen when the date range is valid
                      console.log("Date Range is valid.");
                    } else {
                      // Handle invalid date range
                      console.log("Invalid Date Range.");
                    }
                  }}
                >
                  <div>Select</div>
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGrid>
          </EuiFlexItem>
        </EuiFlexGrid>
        <div style={{ marginTop: "20px" }}>
          <CardContentQouta/>
        </div>
        <div className="mt20">
          <EuiFlexGrid columns={2}>
          </EuiFlexGrid>
        </div>
        <div className="mt20">
          <TableData />
        </div>
      </div>
    </>
  );
};

export default RequestPage;
