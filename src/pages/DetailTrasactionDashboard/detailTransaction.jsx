import React, { useEffect, useMemo, useState } from 'react';
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
import { useParams } from "react-router-dom";
import formService from '../../services/formDashboard';
import DynamicPageHeader from "../../components/Breadcrumbs";
import { useAtom } from 'jotai';
import { days } from '../../helpers/generalState';

const DetailsPageTransaction = () => {
  const {lkfId} = useParams()
  const [formTotal, setFormTotal] = useState(0)
  const date = JSON.parse(localStorage.getItem('formattedDate'));
  const station = JSON.parse(localStorage.getItem('storedStation'));
  const [salam, setSalam] = useAtom(days)

  const breadcrumbs = [
    {
      text: 'Dashboard',
      href: '/',
    },
    {
      text: `${station}`,
      href: `/details/${station}`,
    },
    {
      text: lkfId,
      href: '#',
      onClick: (e) => e.preventDefault(),
    },
  ];

  // const cardsDataAll = [
  //   {
  //     title: formTotal.openStock ? formTotal.openStock + ' Ltrs'  : 0 + ' Ltrs' ,
  //     description1: "Opening Stock",
  //     description2: "(Opening Dip)",
  //     icon: Icon1,
  //   },
  //   {
  //     title: formTotal.receipt ? formTotal.receipt + ' Ltrs'  : 0 + ' Ltrs' ,
  //     description1: "Receipt",
  //     description2: "(From Other FS or FT)",
  //     icon: Icon1,
  //   },
  //   {
  //     title: formTotal.stock ? formTotal.stock + ' Ltrs'  : 0 + ' Ltrs' ,
  //     description1: "Stock",
  //     description2: "( onHand )",
  //     icon: Icon1,
  //   },
  //   {
  //       title: formTotal.issued ? formTotal.issued + ' Ltrs' : 0 + ' Ltrs' ,
  //       description1: "Issued",
  //       description2: "( Issued + Transfer )",
  //       icon: Icon2,
  //     },
  //     {
  //       title: formTotal.totalBalance ? formTotal.totalBalance + ' Ltrs'  : 0 + ' Ltrs' ,
  //       description1: "Total Balance",
  //       description2: "( Stock - Issued )",
  //       icon: Icon2,
  //     },
  //     {
  //       title: formTotal.closingStock ? formTotal.closingStock + ' Ltrs'  : 0 + ' Ltrs' ,
  //       description1: "Closing Stock",
  //       description2: "( Closing Dip)",
  //       icon: Icon2,
  //     },
  //     {
  //       title: formTotal.dailyVarience ? formTotal.dailyVarience + ' Ltrs'  : 0 + ' Ltrs' ,
  //       description1: "Daily Variance",
  //       description2: "( Closing Dip - Balance)",
  //       icon: Icon3,
  //     },
  //     {
  //       title: formTotal.startMeter ? formTotal.startMeter + ' Ltrs'  : 0 + ' Ltrs' ,
  //       description1: "Start Meter",
  //       description2: "( Flow Meter Start",
  //       icon: Icon3,
  //     },
  //     {
  //       title: formTotal.closeMeter ? formTotal.closeMeter + ' Ltrs'  : 0 + ' Ltrs' ,
  //       description1: "Close Meter",
  //       description2: "( Flow Meter End",
  //       icon: Icon3,
  //     },
  //     {
  //       title:formTotal.totalMeter ? formTotal.totalMeter + ' Ltrs'  : 0 + ' Ltrs' ,
  //       description1: "Total Meter",
  //       description2: "( Close Meter - Start Meter",
  //       icon: Icon1,
  //     },
  // ];

  const cardsDataAll = useMemo(()=>(
    [
      {
        title: formTotal.openStock ? formTotal.openStock + ' Ltrs'  : 0 + ' Ltrs' ,
        description1: "Opening Stock",
        description2: "(Opening Dip)",
        icon: Icon1,
      },
      {
        title: station =='FT1116' ? formTotal.receipt_kpc + ' Ltrs' : formTotal.receipt + ' Ltrs',
        description1: "Receipt",
        description2: "(From Other FS or FT)",
        icon: Icon1,
      },
      {
        title: formTotal.stock ? formTotal.stock + ' Ltrs'  : 0 + ' Ltrs' ,
        description1: "Stock",
        description2: "( onHand )",
        icon: Icon1,
      },
      {
          title: formTotal.issued ? formTotal.issued + ' Ltrs' : 0 + ' Ltrs' ,
          description1: "Issued",
          description2: "( Issued + Transfer )",
          icon: Icon2,
        },
        {
          title: formTotal.totalBalance ? formTotal.totalBalance + ' Ltrs'  : 0 + ' Ltrs' ,
          description1: "Total Balance",
          description2: "( Stock - Issued )",
          icon: Icon2,
        },
        {
          title: formTotal.closingStock ? formTotal.closingStock + ' Ltrs'  : 0 + ' Ltrs' ,
          description1: "Closing Stock",
          description2: "( Closing Dip)",
          icon: Icon2,
        },
        {
          title: formTotal.dailyVarience ? formTotal.dailyVarience + ' Ltrs'  : 0 + ' Ltrs' ,
          description1: "Daily Variance",
          description2: "( Closing Dip - Balance)",
          icon: Icon3,
        },
        {
          title: formTotal.startMeter,
          description1: "Start Meter",
          description2: "( Flow Meter Start",
          icon: Icon3,
        },
        {
          title: formTotal.closeMeter ,
          description1: "Close Meter)",
          description2: "( Flow Meter End",
          icon: Icon3,
        },
        {
          title:formTotal.totalMeter  ,
          description1: "Total Meter",
          description2: "( Close Meter - Start Meter",
          icon: Icon1,
        },
    ]
  ),[formTotal])

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

  useEffect(() => {
    console.log(salam)
    const fetchTable = async () => {
      try {
        const res = await formService.summaryForm(lkfId)
        if (res.status != 200) {
          throw new Error('Network response was not ok');
        }
        setFormTotal(res.data);
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
          <DynamicPageHeader
            pageTitle={`No lkf ${lkfId}`}
            breadcrumbs={breadcrumbs}
            pageTitleStyle={{  fontSize: '24px',  }}
          />
          <EuiText>
            <div className="date">{date}</div>
          </EuiText>
        </div>
        <EuiText style={{ marginTop: "20px" }}>
          {" "}
     
        </EuiText>
        <div style={{ marginTop: "20px" }}>
          <CardContentData cardsData={cardsDataAll} />
        </div>
       
    
        <div className="mt20">
          <TableDataDetails lkfId = {lkfId}/>
        </div>
       
      </div>
    </>
  );
};

export default DetailsPageTransaction;
