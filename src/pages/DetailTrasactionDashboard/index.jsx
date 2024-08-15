import React from "react";
import Icon1 from "../../images/icon1.png";
import Icon2 from "../../images/chart.png";
import Icon3 from "../../images/circle.png";
import Icon4 from "../../images/icon4.png";
import CardContentData from "../../components/Card";
import { EuiText } from "@elastic/eui";
import NavTop from "../../components/NavTop";
import TableData from "./table";
import FormModal from "../../components/ModalForm";

const DetailPage = () => {
  const cardsDataAll = [
    {
      title: "4,368 Ltrs",
      description1: "Previous Close Sonding",
      description2: "Total close sonding",
      icon: Icon1,
    },
    {
      title: "119,271 Ltrs",
      description1: "Open Stock (Sonding)",
      description2: "Summary Open Sonding",
      icon: Icon1,
    },
    {
      title: "119,271 Ltrs",
      description1: "Receipt KPC",
      description2: "Summary Receipt KPC",
      icon: Icon1,
    },
  ];
  const cardsDataShiftDay = [
    {
      title: "119,271 Ltrs",
      description1: "Previous Close Sonding",
      description2: "Total close sonding",
      icon: Icon2,
    },
    {
      title: "119,271 Ltrs",
      description1: "Open Stock (Sonding)",
      description2: "Summary Open Sonding",
      icon: Icon2,
    },
    {
      title: "119,271 Ltrs",
      description1: "Receipt KPC",
      description2: "Summary Receipt KPC",
      icon: Icon2,
    },
  ];

  const cardsDataShiftNigth = [
    {
      title: "119,271 Ltrs",
      description1: "Previous Close Sonding",
      description2: "Total close sonding",
      icon: Icon3,
    },
    {
      title: "119,271 Ltrs",
      description1: "Open Stock (Sonding)",
      description2: "Summary Open Sonding",
      icon: Icon3,
    },
    {
      title: "119,271 Ltrs",
      description1: "Receipt KPC",
      description2: "Summary Receipt KPC",
      icon: Icon3,
    },
  ];

  return (
    <>
      <NavTop></NavTop>
      <div className="padding-content">
        <div style={{ marginTop: "20px" }}>
          <EuiText>
            <div className="summary">Dashboard T112</div>
            <div className="date">Tuesday, 26-April-2024</div>
          </EuiText>
        </div>
        <EuiText style={{ marginTop: "20px" }}>
          {" "}
          <h2>Summary All</h2>
        </EuiText>
        <div style={{ marginTop: "20px" }}>
          <CardContentData cardsData={cardsDataAll} />
        </div>
        <EuiText style={{ marginTop: "20px" }}>
          {" "}
          <h2>Summary Day Shift</h2>
        </EuiText>
        <div style={{ marginTop: "20px" }}>
          <CardContentData cardsData={cardsDataShiftDay} />
        </div>
        <EuiText style={{ marginTop: "20px" }}>
          {" "}
          <h2>Summary Day Nigth</h2>
        </EuiText>
        <div style={{ marginTop: "20px" }}>
          <CardContentData cardsData={cardsDataShiftNigth} />
        </div>
        <div className="mt20">
          <TableData />
        </div>
       
      </div>
    </>
  );
};

export default DetailPage;
