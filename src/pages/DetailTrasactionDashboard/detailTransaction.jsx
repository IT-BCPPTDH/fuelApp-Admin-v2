import React, { useEffect, useMemo, useState } from "react";
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
import formService from "../../services/formDashboard";
import DynamicPageHeader from "../../components/Breadcrumbs";
import { useAtom } from "jotai";
import UploadButton from "../../components/ModalForm/ModalUpload";
import EditLkfButton from "../../components/ModalForm/ModalEditLkf";
import ModalFormAddIssued from "../../components/ModalForm/ModalAddTransaction";
import { useNavigate } from "react-router-dom";
import reportService from "../../services/reportService";
import { URL_API } from "../../utils/Enums";
// import { days } from '../../helpers/generalState';
import { DataTrxDetails } from "./datadetails";
import ModalFormDataEdit from "../../components/ModalForm/EditFormData";
import ModalSign from "../../components/ModalForm/modalSign";
import ModalPicture from "../../components/ModalForm/modalPicture";
import moment from "moment";

import {
  EuiButton,
  EuiPagination,
  EuiFieldSearch,
  EuiFlexGrid,
  EuiFlexItem,
  EuiFlexGroup,
  EuiSelect,
} from "@elastic/eui";
import PictureCell from "../../components/ModalForm/modalPicture";
import dailyQuotaService from "../../services/dailyQuotaService";
const dataForm = new FormData();

const pageSizeOptions = [
  { value: 10, text: "10 rows" },
  { value: 20, text: "20 rows" },
  { value: 50, text: "50 rows" },
  { value: 100, text: "100 rows" },
];

const DetailsPageTransaction = () => {
  const [searchValue, setSearchValue] = useState("");
  const { lkfId } = useParams();
  const [formTotal, setFormTotal] = useState(0);
  const date = JSON.parse(localStorage.getItem("tanggal"));
  const station = JSON.parse(localStorage.getItem("storedStation"));
  const [flowEnd, setflowEnd] = useState(0);

  const navigate = useNavigate();
  const [formData, setformData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [imgUrl, setImgUrl] = useState([]);
  const [signUrl, setSignUrl] = useState([]);
  const [replaceTotal, setReplaceTotal] = useState(0);

  const breadcrumbs = [
    {
      text: "Dashboard",
      href: "/",
    },
    {
      text: `${station}`,
      href: `/details/${station}`,
    },
    {
      text: lkfId,
      href: "#",
      onClick: (e) => e.preventDefault(),
    },
  ];

  const cardsDataAll = useMemo(
    () => [
      {
        title: formTotal.openStock
          ? formTotal.openStock + " Ltrs"
          : 0 + " Ltrs",
        description1: "Opening Stock",
        description2: "(Opening Dip)",
        icon: Icon1,
      },
      {
        title:
          station === "FT1116"
            ? formTotal.receipt_kpc + " Ltrs"
            : formTotal.receipt
            ? formTotal.receipt + " Ltrs"
            : "0 Ltrs",
        description1: "Receipt",
        description2: "(From Other FS or FT)",
        icon: Icon1,
      },
      {
        title: formTotal.stock ? formTotal.stock + " Ltrs" : 0 + " Ltrs",
        description1: "Stock",
        description2: "(Opening stock + Receipt)",
        icon: Icon1,
      },
      {
        title: formTotal.issued ? formTotal.issued + " Ltrs" : 0 + " Ltrs",
        description1: "Issued",
        description2: "(Issued + Transfer)",
        icon: Icon2,
      },
      {
        title: formTotal.totalBalance
          ? formTotal.totalBalance + " Ltrs"
          : 0 + " Ltrs",
        description1: "Total Balance",
        description2: "(Stock - Issued)",
        icon: Icon2,
      },
      {
        title: formTotal.closingStock
          ? formTotal.closingStock + " Ltrs"
          : 0 + " Ltrs",
        description1: "Closing Stock",
        description2: "(Closing Dip)",
        icon: Icon2,
      },
      {
        title: formTotal.dailyVarience
          ? formTotal.dailyVarience + " Ltrs"
          : 0 + " Ltrs",
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
        title: formTotal.closeMeter == 0 ? flowEnd : formTotal.closeMeter,
        description1: "(Close Meter)",
        description2: "(Flow Meter End)",
        icon: Icon3,
      },
      {
        title:
          formTotal.closeMeter === 0
            ? replaceTotal.toLocaleString("en-US")
            : formTotal.totalMeter,
        description1: "Total Meter",
        description2: "(Close Meter - Start Meter)",
        icon: Icon1,
      },
    ],
    [formTotal]
  );

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
    const startMeter =
      typeof formTotal?.startMeter === "string"
        ? parseInt(formTotal.startMeter.replace(/,/g, ""), 10)
        : formTotal?.startMeter;
    const result = flowEnd - startMeter;
    setReplaceTotal(result);
  }, [flowEnd, formTotal?.startMeter]);

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await formService.summaryForm(lkfId);
        sessionStorage.setItem("dasboardTrx", JSON.stringify(res.data));
        if (res.status != 200) {
          throw new Error("Network response was not ok");
        }
        setFormTotal(res.data);
      } catch (error) {
        console.log(error);
        // setError(error);
      }
    };
    fetchTable();
  }, []);

  const columns = [
    {
      field: "no_unit",
      name: "Unit No",
      truncateText: true,
      width: "5vh",
    },
    {
      field: "model_unit",
      name: "Model Unit",
      truncateText: true,
      width: "9vh",
    },
    {
      field: "type",
      name: "Type",
      truncateText: true,
      align: "center",
      width: "7vh",
    },
    {
      field: "hm_km",
      name: "HM/KM",
      truncateText: true,
      width: "5vh",
    },
    {
      field: "owner",
      name: "Owner",
      truncateText: true,
      width: "6vh",
    },
    {
      field: "qty",
      name: "QTY",
      truncateText: true,
      width: "5vh",
    },
    {
      field: "fbr",
      name: "FBR",
      truncateText: true,
      width: "5vh",
    },
    {
      field: "flow_start",
      name: "FM Start",
      truncateText: true,
      width: "5vh",
    },
    {
      field: "flow_end",
      name: "FM Close",
      truncateText: true,
      width: "5vh",
    },
    {
      field: "jde_operator",
      name: "ID Operator",
      truncateText: true,
      width: "5vh",
    },
    {
      field: "name_operator",
      name: "Name",
      truncateText: true,
      width: "8vh",
    },
    {
      field: "start",
      name: "Start Time",
      truncateText: true,
      width: "5vh",
    },
    {
      field: "end",
      name: "Stop Time",
      truncateText: true,
      width: "5vh",
    },
    {
      field: "signature",
      name: "Sign",
      align: "center",
      width: "5vh",
      truncateText: true,
      render: (signature) => {
        sessionStorage.setItem("sign", JSON.stringify(signUrl[signature]));
        return signUrl[signature] ? (
          <ModalSign signature={signUrl[signature]} />
        ) : (
          <ModalSign signature={signature} />
        );
      },
    },
    {
      field: "photo",
      name: "Picture",
      align: "center",
      width: "5vh",
      truncateText: true,
      render: (photo) => {
        sessionStorage.setItem("photo", JSON.stringify(imgUrl[photo]));
        return imgUrl[photo] ? (
          <ModalPicture photo={imgUrl[photo]} />
        ) : (
          <ModalPicture photo={photo} />
        );
      },
    },
    {
      field: "entry_time",
      name: "Entry Time",
      truncateText: true,
      width: "10vh",
      align: "center",
    },
    {
      field: "sync_time",
      name: "Sync Time",
      truncateText: true,
      width: "10vh",
      align: "center",
    },
    {
      field: "action",
      name: "Action",
      width: "5vh",
      align: "center",
      render: (e, row) => (
        <>
          <ModalFormDataEdit row={row} />
        </>
      ),
      truncateText: true,
    },
  ];

  const fetchImage = async (photo) => {
    if (imgUrl[photo]) return;

    try {
      const response = await fetch(`${URL_API.generateImgFl}${photo}`, {
        method: "GET",
        headers: {
          "Content-Type": "image/png",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      console.log(imageUrl);
      setImgUrl((prevUrls) => ({ ...prevUrls, [photo]: imageUrl }));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const fetchSign = async (signature) => {
    if (signUrl[signature]) return;

    try {
      const response = await fetch(`${URL_API.generateSign}${signature}`, {
        method: "GET",
        headers: {
          "Content-Type": "image/png",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setSignUrl((prevUrls) => ({ ...prevUrls, [signature]: imageUrl }));
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  const getCellProps = (item, column) => ({
    className: "customCellClass",
    "data-test-subj": `cell-${item.station}-${String(column.field)}`,
    textOnly: true,
  });

  const filteredItems = formData.filter((item) =>
    item.no_unit.toLowerCase().includes(searchValue.toLowerCase())
  );

  const findPageItems = (items, pageIndex, pageSize) => {
    const startIndex = pageIndex * pageSize;
    return {
      pageOfItems: items.slice(startIndex, startIndex + pageSize),
      totalItemCount: items.length,
    };
  };

  const { pageOfItems, totalItemCount } = findPageItems(
    filteredItems,
    pageIndex,
    pageSize
  );

  const resultsCount =
    pageSize === 0 ? (
      <strong>All</strong>
    ) : (
      <>
        <strong>
          {pageSize * pageIndex + 1}-
          {Math.min(pageSize * (pageIndex + 1), totalItemCount)}
        </strong>{" "}
        of {totalItemCount}
      </>
    );

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await formService.tableForm(lkfId);
        if (res.status != 200) {
          throw new Error("Network response was not ok");
        }
        setformData(res.data);
        const filterData = res.data.at(-1);
        setflowEnd(filterData?.flow_end ?? 0);
        sessionStorage.setItem("transaction", JSON.stringify(res.data));
        await Promise.all(
          res.data.map(async (item) => {
            if (item.photo) await fetchImage(item.photo);
            if (item.signature) await fetchSign(item.signature);
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLimitedQuota = async () => {
      try {
        const dates = JSON.parse(localStorage.getItem("tanggal"));
        const response = await dailyQuotaService.getData({
          option: "Daily",
          tanggal: dates,
        });
        if (response.status === "200") {
          sessionStorage.setItem("limited", JSON.stringify(response.data));
        } else {
          sessionStorage.setItem("limited", JSON.stringify([]));
          console.error("data not found", err);
        }
      } catch (err) {
        console.error("Error fetching limited quota:", err);
      }
    };

    fetchLimitedQuota();
    fetchTable();
  }, [setformData]);

  const openNewTab = () => {
    window.open(
      `/form_lkf/Lkf_print.html?id=${lkfId}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleExport = async () => {
    try {
      const data = {
        tanggal: date,
        lkfId: lkfId,
      };
      const response = await reportService.reportLkf(data);
      if (response.status === "200") {
        const reportLink = response.link;
        window.location.href = URL_API.generateReport + reportLink;
      } else {
        console.log(`Gagal mendapatkan laporan: ${response.status}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan ekspor:", error);
    }
  };

  const handleExportElipse = async () => {
    try {
      const data = {
        tanggal: date,
        lkfId: lkfId,
      };
      const response = await reportService.reportLkfElipse(data);
      if (response.status === "200") {
        const reportLink = response.link;
        window.location.href = URL_API.generateReport + reportLink;
      } else {
        console.log(`Gagal mendapatkan laporan: ${response.status}`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat melakukan ekspor:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageIndex(0);
  };

  const renderHeader = () => (
    <>
      <EditLkfButton />
      <UploadButton dataForm={dataForm} />
      <ModalFormAddIssued />
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
            pageTitleStyle={{ fontSize: "24px" }}
          />
          <EuiText>
            <div className="date">{date}</div>
          </EuiText>
        </div>
        <EuiText style={{ marginTop: "20px" }}> </EuiText>
        <div style={{ marginTop: "20px" }}>
          <CardContentData cardsData={cardsDataAll} />
        </div>

        <div className="mt20">
          <EuiFlexGrid
            columns={2}
            style={{ justifyContent: "flex-end", display: "flex" }}
          >
            <EuiFlexItem grow={false}>
              <div
                style={{ marginBottom: "10px", display: "flex", gap: "10px" }}
              >
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

          <div style={{ overflowX: "auto" }}>
            <TableDataDetails
              filteredItems={filteredItems}
              pageOfItems={pageOfItems}
              columns={columns}
              getCellProps={getCellProps}
            />
          </div>

          <EuiFlexGroup
            justifyContent="spaceBetween"
            alignItems="center"
            gutterSize="m"
            style={{ marginTop: "20px" }}
          >
            <EuiFlexItem grow={false}>
              <EuiSelect
                options={pageSizeOptions}
                value={pageSize}
                onChange={handlePageSizeChange}
                aria-label="Rows per page"
              />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <div style={{ textAlign: "center" }}>
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
