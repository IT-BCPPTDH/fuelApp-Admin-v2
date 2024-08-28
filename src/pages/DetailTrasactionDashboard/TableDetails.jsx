import React, { useState } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiFlexGrid,
  EuiFlexItem,
  EuiLink
} from '@elastic/eui';
import { useNavigate } from 'react-router-dom'; 
import { DataTrxDetails } from './datadetails';
import ModalFormAddIssued from '../../components/ModalForm/ModalAddTransaction';

const TableDataDetails = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');

  // Ensure DataTrxDetails and its Details property are defined
  const data = DataTrxDetails || [];

  const columns = [

    {
        field: 'noUnit',
        name: 'Unit No',
        truncateText: true,
      },
    {
      field: 'model',
      name: 'Model Unit',
      truncateText: true,
    },
    {
      field: 'hmkm',
      name: 'HM/KM',
      truncateText: true,
    },
    {
      field: 'owner',
      name: 'Owner',
      truncateText: true,
    },
    {
      field: 'qty',
      name: 'QTY',
      truncateText: true,
    },
    {
      field: 'fm__start',
      name: 'FM Start',
      truncateText: true,
    },
    {
      field: 'fm__close',
      name: 'FM Close',
      truncateText: true,
    },
    {
      field: 'jde',
      name: 'ID Operator',
      truncateText: true,
    },
    {
      field: 'fullname',
      name: 'Name',
      truncateText: true,
    },
    {
      field: 'start_time',
      name: 'Start Time',
      truncateText: true,
    },
    {
      field: 'stop_time',
      name: 'Stop Time',
      truncateText: true,
    },
    {
      field: 'signature',
      name: 'Sig',
      truncateText: true,
    },
    {
      field: 'type',
      name: 'Type',
      truncateText: true,
    },
    {
      field: 'entry_time',
      name: 'Entry Time',
      truncateText: true,
    },
    {
      field: 'sync_time',
      name: 'Sync Time',
      truncateText: true,
    },
    {
      field: 'action',
      name: 'Action',
      render: (item) => (
        <>
       
          <EuiButton
            size='s'
            style={{ background: "#0077CC", color: "white" }}
            color="primary"
            onClick={() => alert('Edit button clicked')}
          >
            Edit
          </EuiButton>
          <EuiButton  
            style={{ background: "#00BFB3", color: "white" }}
            onClick={() => alert('Delete button clicked')}
          >
            Delete
          </EuiButton>
        </>
      ),
      truncateText: true,
    },
  ];

//   const handleRowClick = (item) => {
//     navigate(`/details/${item.station}`); 
//   };

//   const getRowProps = (item) => ({
//     'data-test-subj': `row-${item.station}`,
//     className: 'customRowClass',
//     onClick: () => handleRowClick(item), 
//   });

  const getCellProps = (item, column) => ({
    className: 'customCellClass',
    'data-test-subj': `cell-${item.station}-${String(column.field)}`,
    textOnly: true,
  });

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredItems = data.filter(item =>
    item.noUnit.toLowerCase().includes(searchValue.toLowerCase())
  );

  const renderHeader = () => (
    <>
    
      <EuiButton
        style={{ background: "#0077CC", color: "white" }}
        color="primary"
        onClick={() => alert('Upload Data button clicked')}
      >
        Upload Data
      </EuiButton>
      <ModalFormAddIssued/>
      <EuiButton
        style={{ background: "#F04E98", color: "white" }}
        onClick={() => alert('Print LKF button clicked')}
      >
        Print LKF
      </EuiButton>
      <EuiButton
        style={{ background: "#FBBA6D", color: "white", width: "350px" }}
        onClick={() => alert('Export to Ellipse button clicked')}
      >
        Export to Ellipse
      </EuiButton>
      <EuiButton
        style={{ background: "#73A33F", color: "white" }}
        onClick={() => alert('Export button clicked')}
      >
        Export
      </EuiButton>
    </>
  );

  return (
    <>
    <EuiFlexGrid columns={2}>
        <EuiFlexItem></EuiFlexItem>
    <EuiFlexItem>
    <div style={{ marginBottom: '10px', float: "right", display: "flex", gap: "10px" }}>
        {renderHeader()}
        <EuiFieldSearch
          placeholder="Search data"
          value={searchValue}
          onChange={handleSearchChange}
          aria-label="Search data"
        />
      </div>
    </EuiFlexItem>
    </EuiFlexGrid>

        <EuiFlexGrid>
        <div style={{ marginBottom: '10px', maxHeight: '600px', overflow: 'auto' }}>
        <EuiBasicTable
          tableCaption="Demo of EuiBasicTable"
          items={filteredItems}
          columns={columns}
        
          cellProps={getCellProps}
        />
      </div>
        </EuiFlexGrid>
    </>
  );
};

export default TableDataDetails;
