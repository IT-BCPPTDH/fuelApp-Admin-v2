import React, { useEffect, useState } from 'react';
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
import ModalFormDataEdit from '../../components/ModalForm/EditFormData';
import formService from '../../services/formDashboard';

const TableDataDetails = ({lkfId}) => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [formData, setformData] = useState([])
  const date = JSON.parse(localStorage.getItem('tanggal'));
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);

  const data = DataTrxDetails || [];

  const columns = [
    {
        field: 'no_unit',
        name: 'Unit No',
        truncateText: true,
    },
    {
      field: 'model_unit',
      name: 'Model Unit',
      truncateText: true,
    },
    {
      field: 'hm_km',
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
      field: 'flow_start',
      name: 'FM Start',
      truncateText: true,
    },
    {
      field: 'flow_end',
      name: 'FM Close',
      truncateText: true,
    },
    {
      field: 'jde_operator',
      name: 'ID Operator',
      truncateText: true,
    },
    {
      field: 'name_operator',
      name: 'Name',
      truncateText: true,
    },
    {
      field: 'start',
      name: 'Start Time',
      truncateText: true,
    },
    {
      field: 'end',
      name: 'Stop Time',
      truncateText: true,
    },
    {
      field: 'signature',
      name: 'Sign',
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
      render: (e, row) => (
        <>
        <ModalFormDataEdit row = {row}/>
        </>
      ),
      truncateText: true,
    },
  ];

  const getCellProps = (item, column) => ({
    className: 'customCellClass',
    'data-test-subj': `cell-${item.station}-${String(column.field)}`,
    textOnly: true,
  });

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredItems = formData.filter(item =>
    item.no_unit.toLowerCase().includes(searchValue.toLowerCase())
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

  useEffect(() => {
    const fetchTable = async () => {
      try {
        const res = await formService.tableForm(lkfId)
        if (res.status != 200) {
          throw new Error('Network response was not ok');
        }
        setformData(res.data);
      } catch (error) {
        console.log(error)
        // setError(error);
      } 
    };
    fetchTable()
  }, []);

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
          items={pageOfItems}
          pagination={pagination}
          columns={columns}
          cellProps={getCellProps}
          onChange={({ page }) => {
            if (page) {
              setPageIndex(page.index);
              setPageSize(page.size);
            }
          }}
        />
      </div>
        </EuiFlexGrid>
    </>
  );
};

export default TableDataDetails;
