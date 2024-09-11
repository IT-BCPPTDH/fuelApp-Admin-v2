import React, { useEffect, useState } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiText,
  EuiLink,
  EuiButtonIcon,
} from '@elastic/eui';
import { useNavigate } from 'react-router-dom'; 
import ModalForm from '../../components/ModalForm';
import ModalFormStation from '../../components/ModalForm/ModalAddStation';
import ModalFormStock from '../../components/ModalForm/ModalStockSystem';
import UnitBanlawsService from '../../services/unitBanlaws';

const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [banlaws, setBanlaws] = useState([])

  const columns = [
    {
      field: 'id',
      name: 'No',
      truncateText: true,
    },
    {
      field: 'unit_input',
      name: 'Unit Input',
      truncateText: true,
    },
    {
      field: 'unit_elipse',
      name: 'Unit Elipse',
      truncateText: true,
    },
    {
      field: 'owner',
      name: 'Owner',
      truncateText: true,
    },
    {
      field: 'pin_banlaw',
      name: 'Pin Banlaws',
      truncateText: true,
    },
    {
      field: 'unit_banlaw',
      name: 'Unit Banlaws',
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

  const filteredItems = banlaws.filter(item =>
    item.unit_elipse.toLowerCase().includes(searchValue.toLowerCase())
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

    useEffect(() => {
      const fetchBanlaws = async () => {
        try {
          const res = await UnitBanlawsService.getUnitBanlaws()
          console.log(res)
          if (res.status != 200) {
            throw new Error('Network response was not ok');
          }else if(res.status == 404){
            setBanlaws([]);
          }else{
            setBanlaws(res.data);
          }
        } catch (error) {
          console.log(error)
          // setError(error);
        } 
      };
      fetchBanlaws()
    }, []);


  return (
    <>
      <div style={{ marginBottom: '10px', display: "flex", justifyContent: "flex-end",gap:"15px",alignItems: "center" }}>
    
        <ModalFormStock/>
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
