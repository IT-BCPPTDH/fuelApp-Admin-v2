import { useEffect, useState } from "react";
import { useMemo } from "react";
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

const columns = [
  { columnKey: "tanggal", label: "Tanggal" },
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
  
  const [items, setItems] = useState([]);
  const Navigate = useNavigate();

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
