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
import UploadButton from '../../components/ModalForm/ModalUpload';
import ModalFormAddIssued from '../../components/ModalForm/ModalAddTransaction';
import { useNavigate } from 'react-router-dom'; 
import reportService from '../../services/reportService';
import { URL_API } from '../../utils/Enums';
// import { days } from '../../helpers/generalState';
import { DataTrxDetails } from './datadetails';
import ModalFormDataEdit from '../../components/ModalForm/EditFormData';
import ModalSign from '../../components/ModalForm/modalSign';
import ModalPicture from '../../components/ModalForm/modalPicture';

import {
  EuiButton,
  EuiPagination,
  EuiFieldSearch,
  EuiFlexGrid,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSelect
} from '@elastic/eui';
import PictureCell from '../../components/ModalForm/modalPicture';
const dataForm = new FormData()

const pageSizeOptions = [
  { value: 10, text: '10 rows' },
  { value: 20, text: '20 rows' },
  { value: 50, text: '50 rows' },
  { value: 100, text: '100 rows' },
];

const DetailsPageTransaction = () => {
  const [searchValue, setSearchValue] = useState('');
  const {lkfId} = useParams()
  const [formTotal, setFormTotal] = useState(0)
  const date = JSON.parse(localStorage.getItem('formattedDate'));
  const station = JSON.parse(localStorage.getItem('storedStation'))

  const navigate = useNavigate(); 
  const [formData, setformData] = useState([])
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

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
        description2: "(onHand)",
        icon: Icon1,
      },
      {
          title: formTotal.issued ? formTotal.issued + ' Ltrs' : 0 + ' Ltrs' ,
          description1: "Issued",
          description2: "(Issued + Transfer)",
          icon: Icon2,
        },
        {
          title: formTotal.totalBalance ? formTotal.totalBalance + ' Ltrs'  : 0 + ' Ltrs' ,
          description1: "Total Balance",
          description2: "(Stock - Issued)",
          icon: Icon2,
        },
        {
          title: formTotal.closingStock ? formTotal.closingStock + ' Ltrs'  : 0 + ' Ltrs' ,
          description1: "Closing Stock",
          description2: "(Closing Dip)",
          icon: Icon2,
        },
        {
          title: formTotal.dailyVarience ? formTotal.dailyVarience + ' Ltrs'  : 0 + ' Ltrs' ,
          description1: "Daily Variance",
          description2: "(Closing Dip - Balance)",
          icon: Icon3,
        },
        {
          title: formTotal.startMeter,
          description1: "Start Meter",
          description2: "(Flow Meter Start)",
          icon: Icon3,
        },
        {
          title: formTotal.closeMeter ,
          description1: "Close Meter)",
          description2: "(Flow Meter End)",
          icon: Icon3,
        },
        {
          title:formTotal.totalMeter  ,
          description1: "Total Meter",
          description2: "( Close Meter - Start Meter)",
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

  const data = DataTrxDetails || [];

  const columns = [
    {
        field: 'no_unit',
        name: 'Unit No',
        truncateText: true,
    },
    {
      field: 'model_unit',
      name: 'Model Unit',
      truncateText: true,
    },
    {
      field: 'hm_km',
      name: 'HM/KM',
      truncateText: true,
    },
    {
      field: 'owner',
      name: 'Owner',
      truncateText: true,
    },
    {
      field: 'qty',
      name: 'QTY',
      truncateText: true,
    },
    {
      field: 'flow_start',
      name: 'FM Start',
      truncateText: true,
    },
    {
      field: 'flow_end',
      name: 'FM Close',
      truncateText: true,
    },
    {
      field: 'jde_operator',
      name: 'ID Operator',
      truncateText: true,
    },
    {
      field: 'name_operator',
      name: 'Name',
      truncateText: true,
    },
    {
      field: 'start',
      name: 'Start Time',
      truncateText: true,
    },
    {
      field: 'end',
      name: 'Stop Time',
      truncateText: true,
    },
    {
      field: 'signature',
      name: 'Sign',
      align:'center',
      width:'50vh',
      truncateText: true,
      render: (signature) => <ModalSign signature={signature} />,
    },
    {
      field: 'photo',
      name: 'Picture',
      align:'center',
      width:'50vh',
      truncateText: true,
      render: (signature) => <ModalPicture signature={signature} />,
    },
    {
      field: 'type',
      name: 'Type',
      truncateText: true,
    },
    {
      field: 'entry_time',
      name: 'Entry Time',
      truncateText: true,
    },
    {
      field: 'sync_time',
      name: 'Sync Time',
      truncateText: true,
    },
    {
      field: 'action',
      name: 'Action',
      render: (e, row) => (
        <>
        <ModalFormDataEdit row = {row}/>
        </>
      ),
      truncateText: true,
    },
  ];

  const getCellProps = (item, column) => ({
    className: 'customCellClass',
    'data-test-subj': `cell-${item.station}-${String(column.field)}`,
    textOnly: true,
  });

  const filteredItems = formData.filter(item =>
    item.no_unit.toLowerCase().includes(searchValue.toLowerCase())
  );

  const findPageItems = (items, pageIndex, pageSize) => {
    const startIndex = pageIndex * pageSize;
    return {
      pageOfItems: items.slice(startIndex, startIndex + pageSize),
      totalItemCount: items.length,
    };
  };

  const { pageOfItems, totalItemCount } = findPageItems(filteredItems, pageIndex, pageSize);

  const resultsCount =
    pageSize === 0 ? (
      <strong>All</strong>
    ) : (
      <>
        <strong>
          {pageSize * pageIndex + 1}-{Math.min(pageSize * (pageIndex + 1), totalItemCount)}
        </strong>{' '}
        of {totalItemCount}
      </>
    );


  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await formService.tableForm(lkfId)
        if (res.status != 200) {
          throw new Error('Network response was not ok');
        }
        setformData(res.data);
      } catch (error) {
        console.log(error)
        // setError(error);
      } 
    };
    fetchTable()
  }, []);

  const openNewTab = () => {
    window.open(`/form_lkf/Lkf_print.html?id=${lkfId}`, '_blank', 'noopener,noreferrer');
  }


  const handleExport = async () => {
    try {
      const data = {
        tanggal : date.tanggal,
        lkfId: lkfId
      }
      const response = await reportService.reportLkf(data);
      console.log(response)
      if (response.status === "200") { 
        const reportLink = response.link;
        window.location.href = URL_API.generateReport + reportLink
      } else {
        console.log(`Gagal mendapatkan laporan: ${response.status}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan ekspor:", error);
    }
  }

  const handleExportElipse = async() => {
    try {
      const data = {
        tanggal: date.tanggal,
        lkfId: lkfId
      }
      const response = await reportService.reportLkfElipse(data);
      if (response.status === "200") { 
        const reportLink = response.link;
        window.location.href = URL_API.generateReport + reportLink
      } else {
        console.log(`Gagal mendapatkan laporan: ${response.status}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan ekspor:", error);
    }
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageIndex(0); 
  };

  const renderHeader = () => (
    <>
      <UploadButton dataForm={dataForm}/>
      <ModalFormAddIssued/>
      <EuiButton
        style={{ background: "#F04E98", color: "white" }}
        onClick={openNewTab}
      >
        Print LKF
      </EuiButton>
      <EuiButton
        style={{ background: "#FBBA6D", color: "white", width: "350px" }}
        onClick={handleExportElipse}
      >
        Export to Ellipse
      </EuiButton>
      <EuiButton
        style={{ background: "#73A33F", color: "white" }}
        onClick={handleExport}
      >
        Export
      </EuiButton>
    </>
  );

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
          <EuiFlexGrid columns={2} style={{ justifyContent: 'flex-end', display: 'flex' }}>
            <EuiFlexItem grow={false} >
              <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                {renderHeader()}
                <EuiFieldSearch
                  placeholder="Search data"
                  value={searchValue}
                  onChange={handleSearchChange}
                  aria-label="Search data"
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGrid>

          <div style={{overflowX: 'auto'}}>
              <TableDataDetails filteredItems={filteredItems} pageOfItems={pageOfItems} columns={columns} getCellProps={getCellProps}/>
          </div>
          
          <EuiFlexGroup justifyContent="spaceBetween" alignItems="center" gutterSize="m" style={{ marginTop: '20px'  }}>
            <EuiFlexItem grow={false}>
              <EuiSelect 
                options={pageSizeOptions}
                value={pageSize}
                onChange={handlePageSizeChange}
                aria-label="Rows per page"
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <div style={{ textAlign: 'center' }}>
                <EuiPagination
                  pageCount={Math.ceil(totalItemCount / pageSize)}
                  activePage={pageIndex}
                  onPageClick={(page) => setPageIndex(page)}
                />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
       
      </div>
    </>
  );
};

export default DetailsPageTransaction;
