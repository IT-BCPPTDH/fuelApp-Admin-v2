import React, { useEffect, useState } from 'react';
import Icon1 from "../../images/icon1.png";
import Icon2 from "../../images/chart.png";
import Icon3 from "../../images/circle.png";
import Icon4 from "../../images/icon4.png";
import CardStasion from "../../components/CardStasion/cardStation";
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

  let cardsDataAll, cardsDataShiftDay, cardsDataShiftNigth
  if(station == 'T112'){
    cardsDataAll = [
      {
        title: summaryAll.totalAllOpening ? summaryAll.totalAllOpening + ' Ltrs'  : 0 + ' Ltrs',
        description1: "Opening Stock",
        description2: "Total sonding",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllIssued ? summaryAll.totalAllIssued  + ' Ltrs' : 0 + ' Ltrs',
        description1: "Issued",
        description2: "Summary Issued",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllKpc ? summaryAll.totalAllKpc + ' Ltrs' : 0 + ' Ltrs',
        description1: "Receipt",
        description2: "Summary Receipt",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllClosing ? summaryAll.totalAllClosing + ' Ltrs' : 0 + ' Ltrs',
        description1: "Closing Stock",
        description2: "Closing Stock",
        icon: Icon3,
      },
      {
        title: summaryAll.totalAllVariance ? summaryAll.totalAllVariance + ' Ltrs' : 0 + ' Ltrs',
        description1: "Variace",
        description2: "Total Variance",
        icon: Icon3,
      },
      // {
      //   title: summaryAll.totalAllCloseData ? summaryAll.totalAllCloseData + ' Ltrs' : 0 + ' Ltrs',
      //   description1: "Close Data",
      //   description2: "Total Close Data",
      //   icon: Icon2,
      // }
    ];
    cardsDataShiftDay = [
      {
        title: summaryAll.totalAllOpeningDay ? summaryAll.totalAllOpeningDay + ' Ltrs' : 0 + ' Ltrs',
        description1: "Opening Stock",
        description2: "opening sonding",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllIssuedDay ? summaryAll.totalAllIssuedDay + ' Ltrs' : 0 + ' Ltrs',
        description1: "Issued",
        description2: "Issued Transaction",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllKpcDay ? summaryAll.totalAllKpcDay + ' Ltrs' : 0 + ' Ltrs',
        description1: "Receipt KPC",
        description2: "Summary Receipt KPC",
        icon: Icon1,
      },{
        title: summaryAll.totalAllClosingDay ? summaryAll.totalAllClosingDay + ' Ltrs' : 0 + ' Ltrs',
        description1: "Closing Stock",
        description2: "Close Sonding",
        icon: Icon3,
      },
      {
        title: summaryAll.totalAllVarianceDay ? summaryAll.totalAllVarianceDay + ' Ltrs' : 0 + ' Ltrs',
        description1: "Variance",
        description2: "Variance",
        icon: Icon3,
      },
      // {
      //   title: summaryAll.totalAllCloseDataDay ? summaryAll.totalAllCloseDataDay + ' Ltrs' : 0 + ' Ltrs',
      //   description1: "Close Data",
      //   description2: "Close Data",
      //   icon: Icon2,
      // },
    ];
  
    cardsDataShiftNigth = [
      {
        title: summaryAll.totalAllOpeningNigth ? summaryAll.totalAllOpeningNigth + ' Ltrs' : 0 + ' Ltrs',
        description1: "Opening Stock",
        description2: "opening sonding",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllIssuedNigth ? summaryAll.totalAllIssuedNigth + ' Ltrs' : 0 + ' Ltrs',
        description1: "Issued",
        description2: "Issued Transaction",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllKpcNigth ? summaryAll.totalAllKpcNigth + ' Ltrs' : 0 + ' Ltrs',
        description1: "Receipt KPC",
        description2: "Summary Receipt KPC",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllClosingNigth ? summaryAll.totalAllClosingNigth + ' Ltrs' : 0 + ' Ltrs',
        description1: "Closing Stock",
        description2: "Close Sonding",
        icon: Icon3,
      },
      {
        title: summaryAll.totalAllVarianceNigth ? summaryAll.totalAllVarianceNigth + ' Ltrs' : 0 + ' Ltrs',
        description1: "Variance",
        description2: "Variance",
        icon: Icon3,
      },
      // {
      //   title: summaryAll.totalAllCloseDataNigth ? summaryAll.totalAllCloseDataNigth + ' Ltrs' : 0 + ' Ltrs',
      //   description1: "Close Data",
      //   description2: "Close Data",
      //   icon: Icon2,
      // },
    ];
  }else{
    cardsDataAll = [
      {
        title: summaryAll.totalAllOpening ? summaryAll.totalAllOpening + ' Ltrs'  : 0 + ' Ltrs',
        description1: "Opening Stock",
        description2: "Opening Sonding",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllIssued ? summaryAll.totalAllIssued  + ' Ltrs' : 0 + ' Ltrs',
        description1: "Issued",
        description2: "Summary Issued",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllReceipt ? summaryAll.totalAllReceipt + ' Ltrs' : 0 + ' Ltrs',
        description1: "Receipt",
        description2: "Summary Receipt",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllClosing ? summaryAll.totalAllClosing + ' Ltrs' : 0 + ' Ltrs',
        description1: "Closing Stock",
        description2: "Closing Stock",
        icon: Icon3,
      },
      {
        title: summaryAll.totalAllVariance ? summaryAll.totalAllVariance + ' Ltrs' : 0 + ' Ltrs',
        description1: "Variace",
        description2: "Total Variance",
        icon: Icon3,
      },
      // {
      //   title: summaryAll.totalAllCloseData ? summaryAll.totalAllCloseData + ' Ltrs' : 0 + ' Ltrs',
      //   description1: "Close Data",
      //   description2: "Total Close Data",
      //   icon: Icon2,
      // }
    ];
    cardsDataShiftDay = [
      {
        title: summaryAll.totalAllOpeningDay ? summaryAll.totalAllOpeningDay + ' Ltrs' : 0 + ' Ltrs',
        description1: "Opening Stock",
        description2: "opening sonding",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllIssuedDay ? summaryAll.totalAllIssuedDay + ' Ltrs' : 0 + ' Ltrs',
        description1: "Issued",
        description2: "Issued Transaction",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllReceiptDay ? summaryAll.totalAllReceiptDay + ' Ltrs' : 0 + ' Ltrs',
        description1: "Receipt",
        description2: "Receipt Transaction",
        icon: Icon1,
      },{
        title: summaryAll.totalAllClosingDay ? summaryAll.totalAllClosingDay + ' Ltrs' : 0 + ' Ltrs',
        description1: "Close Sonding",
        description2: "Close Sonding",
        icon: Icon3,
      },
      {
        title: summaryAll.totalAllVarianceDay ? summaryAll.totalAllVarianceDay + ' Ltrs' : 0 + ' Ltrs',
        description1: "Variance",
        description2: "Variance",
        icon: Icon3,
      },
      // {
      //   title: summaryAll.totalAllCloseDataDay ? summaryAll.totalAllCloseDataDay + ' Ltrs' : 0 + ' Ltrs',
      //   description1: "Close Data",
      //   description2: "Close Data",
      //   icon: Icon2,
      // },
    ];
  
    cardsDataShiftNigth = [
      {
        title: summaryAll.totalAllOpeningNigth ? summaryAll.totalAllOpeningNigth + ' Ltrs' : 0 + ' Ltrs',
        description1: "Opening Stock",
        description2: "Opening sonding",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllIssuedNigth ? summaryAll.totalAllIssuedNigth + ' Ltrs' : 0 + ' Ltrs',
        description1: "Issued",
        description2: "Issued Transaction",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllReceiptNigth ? summaryAll.totalAllKpcNigth + ' Ltrs' : 0 + ' Ltrs',
        description1: "Receipt",
        description2: "Receipt Transaction",
        icon: Icon1,
      },
      {
        title: summaryAll.totalAllClosingNigth ? summaryAll.totalAllClosingNigth + ' Ltrs' : 0 + ' Ltrs',
        description1: "Close Sonding",
        description2: "Close Sonding",
        icon: Icon3,
      },
      {
        title: summaryAll.totalAllVarianceNigth ? summaryAll.totalAllVarianceNigth + ' Ltrs' : 0 + ' Ltrs',
        description1: "Variance",
        description2: "Variance",
        icon: Icon3,
      },
      // {
      //   title: summaryAll.totalAllCloseDataNigth ? summaryAll.totalAllCloseDataNigth + ' Ltrs' : 0 + ' Ltrs',
      //   description1: "Close Data",
      //   description2: "Close Data",
      //   icon: Icon2,
      // },
    ];
  }


  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await stationService.summaryStation({tanggal:`${date}`, station:station})
        console.log(res)
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
            <div className="summary">Station {station}</div>
            <div className="date">{dates}</div>
          </EuiText>
        </div>
        <EuiText style={{ marginTop: "20px" }}>
          {" "}
          <h2>Summary All</h2>
        </EuiText>
        <div style={{ marginTop: "20px" }}>
          <CardStasion cardsData={cardsDataAll} />
        </div>
        <EuiText style={{ marginTop: "20px" }}>
          {" "}
          <h2>Summary Day Shift</h2>
        </EuiText>
        <div style={{ marginTop: "20px" }}>
          <CardStasion cardsData={cardsDataShiftDay} />
        </div>
        <EuiText style={{ marginTop: "20px" }}>
          {" "}
          <h2>Summary Nigth Shift</h2>
        </EuiText>
        <div style={{ marginTop: "20px" }}>
          <CardStasion cardsData={cardsDataShiftNigth} />
        </div>
        <div className="mt20">
          <TableData />
        </div>
       
      </div>
    </>
  );
};

export default DetailPage;
