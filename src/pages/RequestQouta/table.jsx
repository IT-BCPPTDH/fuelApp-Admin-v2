import React, { useEffect, useState, useCallback } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiText,
  EuiLink,
} from '@elastic/eui';
import { Data } from './data'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; 
import ModalForm from '../../components/ModalForm';
import requestService from '../../services/requestQuota';
import { URL_API } from '../../utils/Enums';
import ModalPicture from '../../components/ModalForm/modalPicture'


const TableData = () => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [tables, setTables] = useState([])
  const date = JSON.parse(localStorage.getItem('formattedDatesReq'));
  const [imgUrl, setImgUrl] = useState([])

  const fetchImage = async (photo) => {
    if (imgUrl[photo]) {
      return;
    }

    try {
      const response = await fetch(`${URL_API.generateImgReq}${photo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'image/png', 
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const imageBlob = await response.blob();
      const imageUrl = URL.createObjectURL(imageBlob);
      setImgUrl((prevUrls) => ({ ...prevUrls, [photo]: imageUrl }));
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const columns = [
    {
      field: 'date',
      name: 'Tanggal',
    },
    {
      field: 'shift',
      name: 'Shift',
    },
    {
      field: 'unit_no',
      name: 'No Unit',
      truncateText: true,
    },
    {
      field: 'request_name',
      name: 'Nama',
      truncateText: true,
    },
    {
      field: 'request_by',
      name: 'Id Karyawan',
      truncateText: true,
    },
    {
      field: 'quota_request',
      name: 'Permintaan Kuota',
      truncateText: true,
    },
    {
      field: 'document',
      name: 'Form Permintaan',
      truncateText: true,
      render: (document) => {
        return imgUrl[document] ? (
          <ModalPicture photo={imgUrl[document]} />
        ) : (
          <ModalPicture photo={document} />
        );
      },
    },
    {
      field: 'reason',
      name: 'Alasan',
      truncateText: true,
    },
  ];

  const getRowProps = (item) => ({
    'data-test-subj': `row-${item.unit_no}`,
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
    item.unit_no.includes(searchValue.toLowerCase()) ||
    item.request_name.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.request_by.toLowerCase().includes(searchValue.toLowerCase())
  );

  const findPageItems = useCallback((items, pageIndex, pageSize) => {
    const startIndex = pageIndex * pageSize;
    return {
      pageOfItems: items.slice(startIndex, startIndex + pageSize),
      totalItemCount: items.length,
    };
  }, []);

  const { pageOfItems, totalItemCount } = findPageItems(filteredItems, pageIndex, pageSize);

  const handleTableChange = useCallback(({ page }) => {
    if (page) {
      setPageIndex(page.index);
      setPageSize(page.size);
    }
  }, []);

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
      const fetchTable = async (date) => {
        try {
          const res = await requestService.getRequest({tanggal: `${date}`})
          if (res.status != 200) {
            throw new Error('Network response was not ok');
          }else if(res.status == 404){
            setTables([]);
          }else{
            setTables(res.data);
            await Promise.all(res.data.map(async (item) => {
              if(item.document) await fetchImage(item.document)
            }))
          }
        } catch (error) {
          console.log(error)
          // setError(error);
        } 
      };
      if (date) {  
        fetchTable(date);
      }
    }, [date]);

  return (
    <>
      <div style={{ marginBottom: '10px', display: "flex", justifyContent: "flex-end",gap:"15px",alignItems: "center" }}>
    
        <ModalForm/>
        
        {/* <EuiButton
          style={{ background: "#73A33F", color: "white" }}
          color="primary"
          onClick={() => alert('Export button clicked')}
        >
          Export
        </EuiButton> */}
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
        onChange={handleTableChange}
      />
    </>
  );
};

export default TableData;
