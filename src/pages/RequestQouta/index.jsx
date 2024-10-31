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

  const formattedDateReq = moment(selectDate).format('dddd, DD-MM-YYYY');
  const formattedDatesReq = moment(selectDate).format('YYYY-MM-DD');
  localStorage.setItem("tanggalReq", JSON.stringify(formattedDateReq))
  localStorage.setItem("formattedDatesReq", JSON.stringify(formattedDatesReq))

  return (
    <>
      <div className="content-padding">
        <EuiFlexGrid columns={4}>
          <EuiFlexItem>
            <EuiText paddingsize="l">
              <div className="summary">Dashboard Unit Request</div>
              <div style={{marginTop:"10px"}} className="date">{formattedDatesReq}</div>
            </EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText paddingsize="l"></EuiText>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiText paddingsize="l"></EuiText>
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
              {/* <EuiFlexItem>
                <EuiButton
                  size="s"
                  style={{
                    marginTop:"3px",
                    background: "#73A33F",
                    color: "white",
                    width: "100px",
                  }}
                  onClick={handleSelect}
                >
                  <div>Select</div>
                </EuiButton>
              </EuiFlexItem> */}
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
