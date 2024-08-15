import React, { useState } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiFieldText,
  EuiLink
} from '@elastic/eui';
import { Data } from './data';
import { useNavigate } from 'react-router-dom'; 


const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');

  const columns = [
    {
      field: 'station',
      name: 'Station',
      'data-test-subj': 'stationCell',
      mobileOptions: {
        render: (item) => (
          <EuiLink
            href={`#${item.station}`}
            onClick={(e) => {
              e.preventDefault();
              handleRowClick(item); // Handle row click action
            }}
          >
            {item.station}
          </EuiLink>
        ),
        header: false,
        truncateText: false,
        enlarge: true,
        width: '100%',
      },
    },
    {
      field: 'open_stock',
      name: 'Open Stock',
      truncateText: true,
    },
    {
      field: 'receipt_kpc',
      name: 'Receipt Kpc',
      truncateText: true,
    },
    {
      field: 'issued',
      name: 'Issued',
      truncateText: true,
    },
    {
      field: 'transfer',
      name: 'Transfer',
      truncateText: true,
    },
    {
      field: 'close_sonding',
      name: 'Close Sonding',
      truncateText: true,
    },
    {
      field: 'close_data',
      name: 'Close Data',
      truncateText: true,
    },
    {
      field: 'variant',
      name: 'Variant',
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

  const filteredItems = Data.filter(item =>
    item.station.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderHeader = () => (
    <EuiButton
      style={{ background: "#73A33F", color: "white" }}
      color="primary"
      onClick={() => alert('Export button clicked')}
    >
      Export
    </EuiButton>
  );

  return (
    <>
      <div style={{ marginBottom: '10px', float: "inline-end", display: "flex", gap: "10px" }}>
        <EuiFieldText
          placeholder="Search data"
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Search data"
        />
        {renderHeader()}
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
