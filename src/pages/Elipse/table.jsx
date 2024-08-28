import React, { useState } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiText,
  EuiLink,
  EuiButtonIcon,
} from '@elastic/eui';
import { Data } from './data'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; 
import ModalForm from '../../components/ModalForm';
import ModalFormStation from '../../components/ModalForm/ModalAddStation';
import ModalFormStock from '../../components/ModalForm/ModalStockSystem';

const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);

  const columns = [
    {
      field: 'no',
      name: 'No',
      truncateText: true,
    },
    {
      field: 'unit_no',
      name: 'No Unit',
      truncateText: true,
    },
    {
      field: 'item',
      name: 'Item Name',
      truncateText: true,
    },
    {
      field: 'owner',
      name: 'Owner',
      truncateText: true,
    },
    {
      field: 'capacity',
      name: 'Tank Capacity (L)',
      truncateText: true,
    },
    {
      field: 'eq_type',
      name: 'Eq Type',
      truncateText: true,
    },
    {
      field: 'eq_groupId',
      name: 'Eq Group Id',
      truncateText: true,
    },
    {
      field: 'district_code',
      name: 'District Code',
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
              e.stopPropagation(); // Prevent row click
              handleEdit(item);
            }}
          />
          <EuiButtonIcon
            iconType="trash"
            aria-label="Delete"
            color="danger"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click
              handleDelete(item);
            }}
          />
        </div>
      ),
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
    
        {/* <ModalFormStock/> */}
        <EuiButton
          style={{ background: "#1B46D9", color: "white" }}
          color="primary"
          onClick={() => alert('Export button clicked')}
        >
          Import Equpiment
        </EuiButton>
        <EuiButton
          style={{ background: "#FEC514", color: "white" }}
          color="primary"
          onClick={() => alert('Export button clicked')}
        >
          Import Maste Elipse
        </EuiButton>
        <EuiButton
          style={{ background: "#E16104", color: "white" }}
          color="primary"
          onClick={() => alert('Export button clicked')}
        >
          Import Unit Banlaw
        </EuiButton>
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
