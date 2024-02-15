import React, { useState, useEffect } from "react";
import { SearchBox } from "@fluentui/react-search-preview";
import Transaksi from "../../services/inputCoalHauling";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Button,
} from "@fluentui/react-components";

const Test = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dts = await Transaksi.getAllTransaction();
        console.log(dts);
        setItems(dts.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="form-wrapper" style={{ marginTop: "10px" }}>
        <div className="search-box">
          <Button>Download</Button>
          <SearchBox placeholder="Search" />
        </div>
        <div style={{ overflowX: "auto" }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nama</TableCell>
                {/* ...Tambahkan kolom lain sesuai kebutuhan... */}
              </TableRow>
            </TableHeader>
            <TableBody>
            {items && items.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.nama}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Test;
