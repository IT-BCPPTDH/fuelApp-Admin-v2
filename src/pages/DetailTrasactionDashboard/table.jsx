import React, { useEffect, useState } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiFieldText,
  EuiLink
} from '@elastic/eui';

import { DataTrx } from './data';
import { useNavigate } from 'react-router-dom'; 
import { useParams } from "react-router-dom";
import stationService from '../../services/stationDashboard';


const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [formLkf, setFormLkf] = useState([]);
  const {station} = useParams()
  const date = JSON.parse(localStorage.getItem('formattedOption'));

  const columns = [
    {
      field: 'lkf_id',
      name: 'LKF No',
      'data-test-subj': 'stationCell',
      mobileOptions: {
        render: (item) => (
          <EuiLink
            href={`#${item.lkf_id}`}
            onClick={(e) => {
              e.preventDefault();
              handleRowClick(item); 
            }}
          >
            {item.lkf_id}
          </EuiLink>
        ),
        header: false,
        truncateText: false,
        enlarge: true,
        width: '100%',
      },
    },
    {
      field: 'date',
      name: 'Date',
      truncateText: true,
    },
    {
      field: 'fuelman_id',
      name: 'Employee ID',
      truncateText: true,
    },
    {
      field: 'shift',
      name: 'Shift',
      truncateText: true,
    },
    
    {
      field: 'status',
      name: 'Status',
      truncateText: true,
    },
    {
      field: 'time_opening',
      name: 'Stored Time',
      truncateText: true,
    },
    {
      field: 'login_time',
      name: 'Login Time',
      truncateText: true,
    },
    {
      field: 'logout_time',
      name: 'Logout Time',
      truncateText: true,
    },
  ];

 
  const handleRowClick = (item) => {
 
    navigate(`/form-data/${item.lkf_id}`); 
    
  };
  const getRowProps = (item) => ({
    'data-test-subj': `row-${item.lkf_id}`,
    className: 'customRowClass',
    onClick: () => handleRowClick(item), 
  });

  const getCellProps = (item, column) => ({
    className: 'customCellClass',
    'data-test-subj': `cell-${item.station}-${String(column.field)}`,
    textOnly: true,
  });

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const filteredItems = formLkf.filter(item =>
    item.lkf_id.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderHeader = () => (
    <>
    <EuiButton   style={{ background: "#73A33F", color: "white" }}
      onClick={() => alert('Export button clicked')}>Export </EuiButton>
    </>
   

  );

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const opt = {...date, station:station}
        const res = await stationService.tableStation(opt)
        console.log(res.data)
        if (res.status != 200) {
          throw new Error('Network response was not ok');
        }
        setFormLkf(res.data);
      } catch (error) {
        console.log(error)
        // setError(error);
      } 
    };
    fetchTable()
  }, []);


  return (
    <>
      <div style={{ marginBottom: '10px', float: "inline-end", display: "flex", gap: "10px" }}>
      
        {/* {renderHeader()} */}
        <EuiFieldSearch
          placeholder="Search data"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Search data"
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        {/* Additional content if needed */}
      </div>
      <EuiBasicTable
        tableCaption="Demo of EuiBasicTable"
        items={filteredItems}
        columns={columns}
        rowProps={getRowProps}
        cellProps={getCellProps}
      />
    </>
  );
};

export default TableData;
