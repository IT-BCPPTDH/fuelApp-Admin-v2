import React, { useEffect, useState } from 'react';
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
import ModalFormElipse from '../../components/ModalForm/ModalAddElipse';
import ModalFormEditElipse from '../../components/ModalForm/EditFormElipse';
import masterElipseService from '../../services/masterElipse';

const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [elipses, setElipses] = useState([])

  const columns = [
    {
      field: 'id',
      name: 'No',
      truncateText: true,
    },
    {
      field: 'equip_no_unit',
      name: 'No Unit',
      truncateText: true,
    },
    {
      field: 'equip_no_show',
      name: 'No show',
      truncateText: true,
    },
    {
      field: 'equip_model_egi',
      name: 'Model',
      truncateText: true,
    },
    {
      field: 'equip_description',
      name: 'Deskirpsi',
      truncateText: true,
    },
    {
      field: 'equip_category',
      name: 'Kategori',
      truncateText: true,
    },
    {
      field: 'equip_cap_tank',
      name: 'Kapasitas Tank',
      truncateText: true,
    },
    {
      field: 'equip_fbr',
      name: 'FBR',
      truncateText: true,
    },
    {
      field: 'equip_position',
      name: 'Posisi',
      truncateText: true,
    },
    {
      field: 'equip_owner_protes',
      name: 'Protes',
      truncateText: true,
    },
    {
      field: 'equip_owner_elipse',
      name: 'Elipse',
      truncateText: true,
    },
    {
      field: 'keterangan',
      name: 'Keterangan',
      truncateText: true,
    },
    {
      field: 'action',
      name: 'Action',
      render: (e,row) => (
        <><ModalFormEditElipse row={row}/></>
      ),
      truncateText: true,
    },
  ];

  // const handleRowClick = (item) => {
 
  //   navigate(`/details/${item.station}`); 
    
  // };

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

  const filteredItems = elipses.filter(item =>
    item.equip_no_unit.toLowerCase().includes(searchValue.toLowerCase())
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
      const fetchElipse = async () => {
        try {
          const res = await masterElipseService.getElipses()
          if (res.status != 200) {
            throw new Error('Network response was not ok');
          }else if(res.status == 404){
            setElipses([]);
          }else{
            setElipses(res.data);
          }
        } catch (error) {
          console.log(error)
          // setError(error);
        } 
      };
      fetchElipse()
    }, []);
    
  return (
    <>
      <div style={{ marginBottom: '10px', display: "flex", justifyContent: "flex-end",gap:"15px",alignItems: "center" }}>
    
        
        <EuiButton
          style={{ background: "#73A33F", color: "white" }}
          color="primary"
          onClick={() => alert('Export button clicked')}
        >
          Import Master Elipse
        </EuiButton>
        <EuiButton
          style={{ background: "#FEC514", color: "white" }}
          color="primary"
          onClick={() => alert('Export button clicked')}
        >
          Export Master Elipse
        </EuiButton>
        <ModalFormElipse/>
      
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
