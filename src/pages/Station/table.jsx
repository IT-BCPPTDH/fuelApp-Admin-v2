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

const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [tables, setTables] = useState([])

  const columns = [
    {
      field: 'id',
      name: 'No',
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
      field: 'action',
      name: 'Action',
      render: (item) => (
        <div className='action-buttons'>
          <EuiButtonIcon
            iconType="pencil"
            aria-label="Edit"
            color="success"
            onClick={(e) => {
              e.stopPropagation(); 
              handleEdit(item);
            }}
          />
          <EuiButtonIcon
            iconType="trash"
            aria-label="Delete"
            color="danger"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(item, e);
            }}
          />
        </div>
      ),
      truncateText: true,
    },
  ];

  const handleRowClick = (item) => {
    navigate(`/details/${item.id}`); 
  };

  const getRowProps = (item) => ({
    'data-test-subj': `row-${item.id}`,
    className: 'customRowClass',
    onClick: () => handleRowClick(item),
  });

  const getCellProps = (item, column) => ({
    className: 'customCellClass',
    'data-test-subj': `cell-${item.id}-${String(column.field)}`,
    textOnly: true,
  });

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const filteredItems = tables.filter(item =>
    item.fuel_station_name.toLowerCase().includes(searchValue.toLowerCase())
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

  const handleEdit = (item) => {
    // Implement your edit logic here
    console.log('Edit:', item);
    // Example: navigate to an edit page or show a modal
    navigate(`/edit/${item.station}`);
  };

  const handleDelete = (item, e) => {
    // Implement your delete logic here
    console.log('Delete:', e.target.value, item);
    // Example: show a confirmation dialog and make an API call
    if (window.confirm(`Are you sure you want to delete ${item.id}?`)) {
      // Call API to delete item and refresh table
    }
  };

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
        <ModalFormStation />
        <EuiButton
          style={{ background: "#73A33F", color: "white" }}
          color="primary"
          onClick={() => alert('Export button clicked')}
        >
          Export
        </EuiButton>
        <EuiFieldSearch
          placeholder="Search data" 
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Search data"
          style={{ marginRight: '10px' }}
        />
      </div>
      <EuiText size="xs">
        Showing {resultsCount} <strong>Data</strong>
      </EuiText>
      <EuiBasicTable
        style={{ marginTop: "20px" }}
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
