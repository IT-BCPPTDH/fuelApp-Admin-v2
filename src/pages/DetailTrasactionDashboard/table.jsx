import React, { useState } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiFieldText,
  EuiLink
} from '@elastic/eui';

import { DataTrx } from './data';
import { useNavigate } from 'react-router-dom'; 


const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');

  const columns = [
    {
      field: 'lkf',
      name: 'LKF No',
      'data-test-subj': 'stationCell',
      mobileOptions: {
        render: (item) => (
          <EuiLink
            href={`#${item.lkf}`}
            onClick={(e) => {
              e.preventDefault();
              handleRowClick(item); 
            }}
          >
            {item.lkf}
          </EuiLink>
        ),
        header: false,
        truncateText: false,
        enlarge: true,
        width: '100%',
      },
    },
    {
      field: 'tanggal',
      name: 'Date',
      truncateText: true,
    },
    {
      field: 'fuelman',
      name: 'Fuelman',
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
      field: 'stored_time',
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
 
    // navigate(`/details/${item.station}`); 
    navigate('/details'); 
  };

  const getRowProps = (item) => ({
    'data-test-subj': `row-${item.station}`,
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

  const filteredItems = DataTrx.filter(item =>
    item.lkf.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderHeader = () => (
    <>
     <EuiButton
      style={{ background: "#0077CC", color: "white" }}
      color="primary"
      onClick={() => alert('Export button clicked')}
    >
      Upload Data
    </EuiButton>
    <EuiButton  
      style={{ background: "#00BFB3", color: "white" }}
      onClick={() => alert('Export button clicked')}
    >Add Data
    </EuiButton>
    <EuiButton   style={{ background: "#F04E98", color: "white" }}
      onClick={() => alert('Export button clicked')} >Print LKF</EuiButton>
    <EuiButton   style={{ background: "#FBBA6D", color: "white", width:"350px"}}
      onClick={() => alert('Export button clicked')}>Export to Ellipse </EuiButton>
    <EuiButton   style={{ background: "#73A33F", color: "white" }}
      onClick={() => alert('Export button clicked')}>Export </EuiButton>
    </>
   

  );

  return (
    <>
      <div style={{ marginBottom: '10px', float: "inline-end", display: "flex", gap: "10px" }}>
      
        {renderHeader()}
        <EuiFieldText
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
