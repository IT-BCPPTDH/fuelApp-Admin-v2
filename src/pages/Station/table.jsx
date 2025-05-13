import React, { useEffect, useState } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiText,
  EuiButtonIcon,
} from '@elastic/eui';
import { Data } from './data'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; 
import ModalFormStation from '../../components/ModalForm/ModalAddStation';
import stationService from '../../services/stationDashboard';
import ModalFormStationEdit from '../../components/ModalForm/EditFormStation';
import ModalBulkStation from '../../components/ModalForm/ModalBulkStation';

const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [tables, setTables] = useState([])
  
  const columns = [
    { 
      name: 'No', 
      render: (row) => ( <span>{row.pageIndex + 1}</span> ), 
      truncateText: true, 
    },
    {
      field: 'fuel_station_name',
      name: 'FS/FT',
      truncateText: true,
    },
    {
      field: 'fuel_station_type',
      name: 'Type',
      truncateText: true,
    },
    {
      field: 'fuel_capacity',
      name: 'Capacity/L',
      truncateText: true,
    },
    {
      field: 'fuel_nozel',
      name: 'Nozel Qty',
      truncateText: true,
    },
    {
      name: 'Action',
      render: (row) => (
       <div className='action-buttons'>
        <div>
          <ModalFormStationEdit row={row}></ModalFormStationEdit>
        </div>
          <EuiButtonIcon
            // iconType="trash"
            aria-label="Delete"
            color="danger"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(row.id);
            }}
          />
       </div>
      ),
      truncateText: true,
    },
  ];

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const filteredItems = tables.filter(item =>
    item.fuel_station_name.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.fuel_station_type.toLowerCase().includes(searchValue.toLowerCase()) ||
    String(item.fuel_capacity).includes(searchValue) ||
    String(item.id).includes(searchValue.toLowerCase()) ||
    String(item.fuel_nozel).includes(searchValue.toLowerCase()) 
  );

  const findPageItems = (items, pageIndex, pageSize) => {
     const startIndex = pageIndex * pageSize; 
     const pageOfItems = items.slice(startIndex, startIndex + pageSize)
     .map((item, index) => ({ ...item, pageIndex: startIndex + index, })); 
     return { pageOfItems, totalItemCount: items.length, }; 
  };

  const { pageOfItems, totalItemCount } = findPageItems(filteredItems, pageIndex, pageSize);

  const pagination = {
    pageIndex,
    pageSize,
    totalItemCount,
    pageSizeOptions: [10, 20, 50, 100],
    showPerPageOptions,
  };

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
    const fetchStation = async () => {
      try {
        const res = await stationService.getStation()
        if (res.status != 200) {
          throw new Error('Network response was not ok');
        }else if(res.status == 404){
          setTables([]);
        }else{
          setTables(res.data);
        }
      } catch (error) {
        console.log(error)
        // setError(error);
      } 
    };
    fetchStation()
  }, []);
 

  return (
    <>
      <div style={{ marginBottom: '10px', display: "flex", justifyContent: "flex-end", gap: "15px", alignItems: "center" }}>
        <EuiFieldSearch
          placeholder="Search data" 
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Search data"
          style={{ marginRight: '10px' }}
        />
        <ModalFormStation />
        <ModalBulkStation />
      </div>
      <EuiText size="xs">
        Showing {resultsCount} <strong>Data</strong>
      </EuiText>
      <EuiBasicTable
        style={{ marginTop: "20px" }}
        tableCaption="Demo of EuiBasicTable"
        items={pageOfItems}
        columns={columns}
        pagination={pagination}
        onChange={({ page }) => {
          if (page) {
            setPageIndex(page.index);
            setPageSize(page.size);
          }
        }}
      />
    </>
  );
};

export default TableData;
