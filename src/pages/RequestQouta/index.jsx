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

  // Handle date range changes
  const handleStartDateChange = (date) => {
    setStartDate(date);
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

  return (
    <>
      <div className="content-padding">
        <EuiFlexGrid columns={4}>
          <EuiFlexItem>
            <EuiText paddingSize="l">
              <div className="summary">Dashboard Unit Request</div>
              <div className="date">Tuesday, 26-April-2024</div>
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
                  selected={startDate}
                  onChange={handleStartDateChange}
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiButton
                  size="s"
                  style={{
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
            <EuiFlexItem>
              <EuiText paddingSize="l">
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

export default RequestPage;
