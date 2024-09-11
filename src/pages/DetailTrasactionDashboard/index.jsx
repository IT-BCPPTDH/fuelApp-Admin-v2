import React, { useEffect, useState } from 'react';
import Icon1 from "../../images/icon1.png";
import Icon2 from "../../images/chart.png";
import Icon3 from "../../images/circle.png";
import Icon4 from "../../images/icon4.png";
import CardContentData from "../../components/Card";
import { EuiText } from "@elastic/eui";
import NavTop from "../../components/NavTop";
import TableData from "./table";
import FormModal from "../../components/ModalForm";
import { useParams } from "react-router-dom";
import stationService from '../../services/stationDashboard';

const DetailPage = () => {
  const {station} = useParams()
  const [summaryAll, setSummaryAll] = useState(0)
  const date = JSON.parse(localStorage.getItem('tanggal'));
  const dates= JSON.parse(localStorage.getItem('formattedDate'));

  const cardsDataAll = [
    {
      title: summaryAll.totalPrevSonding,
      description1: "Previous Close Sonding",
      description2: "Total close sonding",
      icon: Icon1,
    },
    {
      title: summaryAll.totalOpenSonding,
      description1: "Open Stock (Sonding)",
      description2: "Summary Open Sonding",
      icon: Icon1,
    },
    {
      title: summaryAll.totalReciptKpc,
      description1: "Receipt KPC",
      description2: "Summary Receipt KPC",
      icon: Icon1,
    },
  ];
  const cardsDataShiftDay = [
    {
      title: summaryAll.prevSondingDay,
      description1: "Previous Close Sonding",
      description2: "Total close sonding",
      icon: Icon2,
    },
    {
      title: summaryAll.openSondingDay,
      description1: "Open Stock (Sonding)",
      description2: "Summary Open Sonding",
      icon: Icon2,
    },
    {
      title: summaryAll.receiptKpcDay,
      description1: "Receipt KPC",
      description2: "Summary Receipt KPC",
      icon: Icon2,
    },
  ];

  const cardsDataShiftNigth = [
    {
      title: summaryAll.prevSondingNight,
      description1: "Previous Close Sonding",
      description2: "Total close sonding",
      icon: Icon3,
    },
    {
      title: summaryAll.openSondingNight,
      description1: "Open Stock (Sonding)",
      description2: "Summary Open Sonding",
      icon: Icon3,
    },
    {
      title: summaryAll.receiptKPCNight,
      description1: "Receipt KPC",
      description2: "Summary Receipt KPC",
      icon: Icon3,
    },
  ];

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await stationService.summaryStation({tanggal:`${date}`, station:station})
        if (res.status != 200) {
          throw new Error('Network response was not ok');
        }
        setSummaryAll(res.data);
      } catch (error) {
        console.log(error)
        // setError(error);
      } 
    };
    fetchTable()
  }, []);

  return (
    <>
     
      <div className="padding-content">
        <div style={{ marginTop: "20px" }}>
          <EuiText>
            <div className="summary">Station T112</div>
            <div className="date">{dates}</div>
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
