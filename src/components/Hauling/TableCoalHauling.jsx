import { useEffect, useState } from "react";
import { useMemo } from "react";
// import { SearchBox } from "@fluentui/react-search-preview";
import FormComponent from "../FormComponent";
import { useNavigate } from "react-router-dom";
import { ArrowSquareUpRight24Regular } from "@fluentui/react-icons";
import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  TableCellLayout,
  Button
} from "@fluentui/react-components";
import Transaksi from "../../services/inputCoalHauling";
// import DetailHauling from "../../pages/DetailHauling";

// const items = [
//   {
//     tanggal: { label: "12/01/2024" },
//     author: { label: "Rahmansyah Kurniawan" },
//     total: { label: 177 },
//   },
//   {
//     tanggal: { label: "13/01/2024" },
//     author: { label: "Walyadin" },
//     total: { label: 478 },
//   },
// ];

const columns = [
  { columnKey: "tanggal", label: "Tanggal" },
  // { columnKey: "author", label: "Author" },
  { columnKey: "total", label: "Total Hauling" },
  { columnKey: "action", label: "Action" },
];

const TableCoalHauling = () => {
  const selectTgl = useMemo(
    () => [
      {
        name: "tanggal",
        grid: "col-12",
        value: "",
        readOnly: false,
        disabled: false,
        type: "DatePicker",
      },
    ],
    []
  );
  // const [dates, setDates] = useState("");
  const [items, setItems] = useState([]);
  const Navigate = useNavigate();

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const day = date.getDate().toString().padStart(2, '0');
  
  //   return `${day}-${month}-${year}`;
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const datamain = await Transaksi.getDataMain();
        const updatedItems = datamain.data.map((itemFromDB) => ({
          tanggal: { label: itemFromDB.tanggal },
          totaltonnage: { label: itemFromDB.totalTonnage },
        }));

        setItems(updatedItems);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchData();
  }, []);

  const handleDetail = async (tanggal) => {
    try {
      // console.log(1, tanggal);
      // setDates(tanggal);
      Navigate(`/coalhauling-dataentry-detail/${tanggal}`);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <div className="search-box">
          <FormComponent components={selectTgl} />
        </div>
        <Table aria-label="Default table">
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHeaderCell key={column.columnKey}>
                  {column.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item, index) => (
              <TableRow key={`${item.id}-${index}`}>
                <TableCell>
                  <TableCellLayout>
                    {item.tanggal.label}
                  </TableCellLayout>
                </TableCell>
                <TableCell>
                  <TableCellLayout>{item.totaltonnage.label}</TableCellLayout>
                </TableCell>
                <TableCell>
                  <Button
                    icon={<ArrowSquareUpRight24Regular />}
                    iconPosition="after"
                    onClick={() => handleDetail(item.tanggal.label)}>
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default TableCoalHauling;
