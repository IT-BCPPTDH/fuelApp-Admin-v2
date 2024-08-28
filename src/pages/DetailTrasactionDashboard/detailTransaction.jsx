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
import TableDataDetails from "./TableDetails";

const DetailsPageTransaction = () => {
  const cardsDataAll = [
    {
      title: "4,368 Ltrs",
      description1: "Opening Stock",
      description2: "(Opening Dip)",
      icon: Icon1,
    },
    {
      title: "119,271 Ltrs",
      description1: "Recept",
      description2: "(From Other FS or FT)",
      icon: Icon1,
    },
    {
      title: "119,271 Ltrs",
      description1: "Stock",
      description2: "( onHand )",
      icon: Icon1,
    },
    {
        title: "119,271 Ltrs",
        description1: "Issued",
        description2: "( Issued + Transfer )",
        icon: Icon2,
      },
      {
        title: "119,271 Ltrs",
        description1: "Total Balance",
        description2: "( Stock - Issued )",
        icon: Icon2,
      },
      {
        title: "119,271 Ltrs",
        description1: "Closing Stock",
        description2: "( Closing Dip)",
        icon: Icon2,
      },
      {
        title: "271 Ltrs",
        description1: "Daily Variance",
        description2: "( Closing Dip - Balance)",
        icon: Icon3,
      },
      {
        title: "1000",
        description1: "Start Meter",
        description2: "( Flow Meter Start",
        icon: Icon3,
      },
      {
        title: "1200",
        description1: "Close Meter",
        description2: "( Flow Meter End",
        icon: Icon3,
      },
      {
        title: "1200",
        description1: "Total Meter",
        description2: "( Close Meter - Start Meter",
        icon: Icon1,
      },
  ];

  const cardsDataShiftDay = [
    {
      title: "119,271 Ltrs",
      
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

 

  return (
    <>
     
      <div className="padding-content">
        <div style={{ marginTop: "20px" }}>
          <EuiText>
            <div className="summary">Dashboard T112</div>
            <div className="date">Tuesday, 26-April-2024</div>
          </EuiText>
        </div>
        <EuiText style={{ marginTop: "20px" }}>
          {" "}
     
        </EuiText>
        <div style={{ marginTop: "20px" }}>
          <CardContentData cardsData={cardsDataAll} />
        </div>
       
       
    
        <div className="mt20">
          <TableDataDetails />
        </div>
       
      </div>
    </>
  );
};

export default DetailsPageTransaction;
