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
import ModalFormStock from '../../components/ModalForm/ModalStockSystem';
import ModalSondingnEdit from '../../components/ModalForm/EditFormSonding';
import sondingService from '../../services/masterSonding';

const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [sonding, setSonding] = useState([])

  const columns = [
    {
      field: 'id',
      name: 'No',
      truncateText: true,
    },
    {
      field: 'station',
      name: 'Station',
      truncateText: true,
    },
    {
      field: 'cm',
      name: 'CM',
      truncateText: true,
    },
    {
      field: 'liters',
      name: 'Liters',
      truncateText: true,
    },
    {
      field: 'site',
      name: 'Site',
      truncateText: true,
    },

    {
      field: 'action',
      name: 'Action',
      render: (e,row) => (
        // <>
        // <ModalSondingnEdit row={row}/>
        // </>
        <div className='action-buttons'>
          <EuiButtonIcon
            iconType="pencil"
            aria-label="Edit"
            color="success"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click
              handleEdit(row);
            }}
          />
          <EuiButtonIcon
            iconType="trash"
            aria-label="Delete"
            color="danger"
            onClick={(e) => {
              e.stopPropagation(); // Prevent row click
              handleDelete(row.id);
            }}
          />
        </div>
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

  const filteredItems = sonding.filter(item =>
    item.station.toLowerCase().includes(searchValue.toLowerCase()) ||
    String(item.id).toLowerCase().includes(searchValue.toLowerCase()) ||
    String(item.cm).toLowerCase().includes(searchValue.toLowerCase()) ||
    String(item.liters).toLowerCase().includes(searchValue.toLowerCase()) ||
    item.site.toLowerCase().includes(searchValue.toLowerCase())
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
      const fetchSonding = async () => {
        try {
          const res = await sondingService.getSonding()
          if (res.status != 200) {
            throw new Error('Network response was not ok');
          }else if(res.status == 404){
            setSonding([]);
          }else{
            setSonding(res.data);
          }
        } catch (error) {
          console.log(error)
          // setError(error);
        } 
      };
      fetchSonding()
    }, []);

    const handleDelete = async(id) => {
      try{
        await sondingService.delSonding(id).then((res)=>{
          if(res.status == 200){
            console.log('Berhasil Hapus')
          }else{
            console.log("first")
          }
        }).catch((error)=>{
          console.log(error)
        })
      }catch(error){
        console.log(error)
      }
    } 

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
