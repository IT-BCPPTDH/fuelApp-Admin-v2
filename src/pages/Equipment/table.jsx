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
import ModalAddEquip from '../../components/ModalForm/ModalAddEquip';
import ModalEditEquipment from '../../components/ModalForm/EditEquipment';
import EquipService from '../../services/EquiptmentService';

const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [banlaws, setBanlaws] = useState([])
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  const columns = [
    {
      field: 'id',
      name: 'No',
      truncateText: true,
    },
    {
      field: 'unit_no',
      name: 'No Unit',
      truncateText: true,
    },
    {
      field: 'type',
      name: 'Unit Type',
      truncateText: true,
    },
    {
      field: 'tank_cap',
      name: 'Tank Capacity/L',
      truncateText: true,
    },
    {
      field: 'category',
      name: 'Unit Group Id',
      truncateText: true,
    },
    {
      field: 'site',
      name: 'Site',
      truncateText: true,
    },
    {
      field: 'owner',
      name: 'Owner',
      truncateText: true,
    },
    {
      field: 'action',
      name: 'Action',
      render: (item, row) => (
        <ModalEditEquipment row={row}/>
      ),
      truncateText: true,
    },
  ];

  const getRowProps = (item) => ({
    'data-test-subj': `row-${item.station}`,
    className: 'customRowClass',
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
    String(item.unit_no).toLowerCase().includes(searchValue.toLowerCase()) ||
    String(item.type).toLowerCase().includes(searchValue.toLowerCase()) ||
    item.category.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.site.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.owner.toLowerCase().includes(searchValue.toLowerCase())
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
          const res = await EquipService.getEquip()
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
        <ModalAddEquip/>
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
