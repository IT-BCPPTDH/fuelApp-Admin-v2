import React, { useEffect, useState } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiText,
  EuiLink,
} from '@elastic/eui';
import { Data } from './data'; 
import MainService from '../../services/HomeData';
import { useNavigate } from 'react-router-dom'; 

const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [tables, setTables] = useState([])

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
      field: 'total_opening',
      name: 'Open Stock',
      truncateText: true,
    },
    {
      field: 'receipt_kpc',
      name: 'Receipt Kpc',
      truncateText: true,
    },
    {
      field: 'total_receive',
      name: 'Receipt',
      truncateText: true,
    },
    {
      field: 'total_issued',
      name: 'Issued',
      truncateText: true,
    },
    {
      field: 'total_transfer',
      name: 'Transfer',
      truncateText: true,
    },
    {
      field: 'total_closing',
      name: 'Close Sonding',
      truncateText: true,
    },
    {
      field: 'closeDataPrev',
      name: 'Close Data',
      truncateText: true,
    },
    {
      field: 'variants',
      name: 'Variant',
      truncateText: true,
    },
    {
      field: 'interShift',
      name: 'Intershift',
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

  const filteredItems = tables.filter(item =>
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

  const date = JSON.parse(localStorage.getItem('tanggal'));

  useEffect(() => {
    const fetchTable = async (date) => {
      try {
        const res = await MainService.tableDashboard({tanggal: `${date}`})
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
    if (date) {  
      fetchTable(date);
    }
  }, [date, tables]);
  
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
