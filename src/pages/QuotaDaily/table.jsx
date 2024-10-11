import React, { useEffect, useState, useCallback } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiText,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
} from '@elastic/eui';
// import { Data } from './data'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; 
import ModalForm from '../../components/ModalForm';
import ToogleActive from './toggleActive';
import dailyService from '../../services/dailyQuotaService';


const TableData = ({opt}) => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [tables, setTables] = useState([])

  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmStatus, setConfirmStatus] = useState(''); 
  const [isConfirmStatus, setIsConfirmStatus] = useState(false)
  const showConfirmModal = () => setIsConfirmStatus(true);
  const closeConfirmModal = () => {
    setIsConfirmStatus(false)
    window.location.reload()
  }


  const columns = [
    {
      field: 'number',
      name: 'Nomor',
    },
    {
      field: 'date',
      name: 'Tanggal',
    },
    {
      field: 'unitNo',
      name: 'No Unit',
      truncateText: true,
    },
    {
      field: 'modelUnit',
      name: 'Model',
      truncateText: true,
    },
    {
      field: 'quota',
      name: 'Limited Quota',
      truncateText: true,
    },
    {
      field: 'used',
      name: 'Quota Terpakai',
      truncateText: true,
    },
    {
      field: 'additional',
      name: 'Tambahan',
      truncateText: true,
    },
    {
      field: 'isActive',
      name: 'Active',
      render: (e, row) => (
        <>
        <ToogleActive row={row}/>
        </>
      ),
      truncateText: true,
    },
  ];

  const getRowProps = (item) => ({
    'data-test-subj': `row-${item.unit_no}`,
    className: 'customRowClass',
    // onClick: () => handleRowClick(item), 
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
    item.unitNo.toLowerCase().includes(searchValue.toLowerCase()) 
    || item.modelUnit.toLowerCase().includes(searchValue.toLowerCase()) 
    // ||
    // item.request_by.toLowerCase().includes(searchValue.toLowerCase())
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
      const fetchTable = async (opt) => {
        try {
          const res = await dailyService.getData(opt)
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
      if (opt) {  
        fetchTable(opt);
      }
    }, [opt]);

    const handleDisableBus = async() => {
      try {
        const res = await dailyService.disableBusQuo(opt.tanggal)
        if (res.status != 200) {
          setConfirmStatus('Error')
          setConfirmMessage('Oops..sepertinya ada kesalahan!')
        }else{
          setConfirmStatus('Success!')
          setConfirmMessage('Model unit bus berhasil disable!')
        }
      } catch (error) {
        setConfirmStatus('Error')
        setConfirmMessage('Yah, sepertinya ada yang error! ', error)
      } finally{
        showConfirmModal()
      }
    }

    const handleDisableLV = async() => {
      try {
        const res = await dailyService.disableLvQuo(opt.tanggal)
        if (res.status != 200) {
          setConfirmStatus('Error')
          setConfirmMessage('Oops..sepertinya ada kesalahan!')
        }else{
          setConfirmStatus('Success!')
          setConfirmMessage('Model unit Lv berhasil disable.')
        }
      } catch (error) {
        setConfirmStatus('Error')
        setConfirmMessage('Yah, sepertinya ada yang error! ', error)
      } finally{
        showConfirmModal()
      }
    }

    const handleDisableHLV = async() => {
      try {
        const res = await dailyService.disableHlvQuo(opt.tanggal)
        if (res.status != 200) {
          setConfirmStatus('Error')
          setConfirmMessage('Oops..sepertinya ada kesalahan!')
        }else{
          setConfirmStatus('Success!')
          setConfirmMessage('Model unit Hlv berhasil disable.')
        }
      } catch (error) {
        setConfirmStatus('Error')
        setConfirmMessage('Yah, sepertinya ada yang error! ', error)
      } finally{
        showConfirmModal()
      }
    }

    const generateData = async() => {
      try {
        const res = await dailyService.insertData()
        if (res.status != 200) {
          setConfirmStatus('Error')
          setConfirmMessage('Network response was not ok')
        }else{
          setConfirmStatus('Success!')
          setConfirmMessage('Data berhasil di generate.')
        }
      } catch (error) {
        setConfirmStatus('Error')
        setConfirmMessage('Data berhasil di generate.')
      } finally{
        showConfirmModal()
      }
    }

    const renderHeader = () => (
      <>
        <EuiButton
          style={{ background: "#0077CC", color: "white" }}
          color="primary"
          onClick={generateData}
        >
          Generate data
        </EuiButton>
        <EuiButton
          style={{ background: "#F04E98", color: "white" }}
          color="primary"
          onClick={handleDisableBus}
        >
          Disable Bus
        </EuiButton>
        <EuiButton
          style={{ background: "#FBBA6D", color: "white" }}
          color="primary"
          onClick={handleDisableLV}
        >
          Disable HLV
        </EuiButton>
        <EuiButton
          style={{ background: "#73A33F", color: "white" }}
          color="primary"
          onClick={handleDisableHLV}
        >
          Disable LV
        </EuiButton>
      </>
    );

  return (
    <>
      <div style={{ marginBottom: '10px', display: "flex", justifyContent: "flex-end",gap:"15px",alignItems: "center" }}>
        
        {renderHeader()}
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

      {isConfirmStatus && (
        <EuiModal onClose={closeConfirmModal}>
        <EuiModalBody>
          <EuiText style={{
              fontSize: '22px',
              height: '25%',
              marginTop: '25px',
              color: confirmStatus === 'Success!' ? '#73A33F' : '#D52424',
              fontWeight: '600',
            }}>
            {confirmStatus}
          </EuiText>
          <EuiText style={{
              fontSize: '15px',
              height: '25%',
              marginTop: '35px'
            }}>
            {confirmMessage}
          </EuiText>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={closeConfirmModal} style={{ background: "crimson", color: "white" }}>
            Tutup
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    )}
    </>
  );
};

export default TableData;
