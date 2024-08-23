import React, { useState } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiText,
  EuiLink,
} from '@elastic/eui';
import { Data } from './data'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; 

const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);

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
 
    navigate(`/details/${item.station}`); 
    
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

  const findPageItems = (items, pageIndex, pageSize) => {
    const startIndex = pageIndex * pageSize;
    return {
      pageOfItems: items.slice(startIndex, startIndex + pageSize),
      totalItemCount: items.length,
    };
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

  return (
    <>
      <div style={{ marginBottom: '10px', display: "flex", justifyContent: "flex-end",gap:"15px",alignItems: "center" }}>
        <EuiFieldSearch
          placeholder="Search data" 
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Search data"
          style={{ marginRight: '10px' }}
        />
        <EuiButton
          style={{ background: "#73A33F", color: "white" }}
          color="primary"
          onClick={() => alert('Export button clicked')}
        >
          Export
        </EuiButton>
      </div>
      <EuiText size="xs">
        Showing {resultsCount} <strong>Data</strong>
      </EuiText>
      <EuiBasicTable style={{marginTop:"20px"}}
        tableCaption="Demo of EuiBasicTable"
        items={pageOfItems}
        columns={columns}
        rowProps={getRowProps}
        cellProps={getCellProps}
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
