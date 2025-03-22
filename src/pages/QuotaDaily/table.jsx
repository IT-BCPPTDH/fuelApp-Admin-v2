import React, { useEffect, useState, useCallback } from 'react';
import {
  EuiBasicTable,
  EuiButton,
  EuiFieldSearch,
  EuiText,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiForm,
  EuiFlexGrid,
  EuiFormRow,
  EuiFieldText,
  EuiCheckbox
} from '@elastic/eui';
// import { Data } from './data'; // Ensure this path is correct
import { useNavigate } from 'react-router-dom'; 
import ModalForm from '../../components/ModalForm';
import ToogleActive from './toggleActive';
import dailyService from '../../services/dailyQuotaService';
import moment from "moment";
import AddQuota from '../../components/ModalForm/AddQuotaDaily';


const TableData = ({opt}) => {
  const navigate = useNavigate(); 
  const [searchValue, setSearchValue] = useState('');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [showPerPageOptions, setShowPerPageOptions] = useState(true);
  const [tables, setTables] = useState([])

  const [formBus, setFormBus] = useState({
    is_active : false,
    quota: 0
  })

  const [formLv, setFormLv] = useState({
    is_active : false,
    quota: 0
  })

  const [formHlv, setFormHlv] = useState({
    is_active : false,
    quota: 0
  })

  const [confirmMessage, setConfirmMessage] = useState('');
  const [confirmStatus, setConfirmStatus] = useState(''); 
  const [isConfirmStatus, setIsConfirmStatus] = useState(false)
  const showConfirmModal = () => setIsConfirmStatus(true);
  const closeConfirmModal = () => {
    setIsConfirmStatus(false)
  }

  const [isModalBusStatus, setIsModalBusStatus] = useState(false)
  const showModalBusModal = () => setIsModalBusStatus(true);
  const closeBusModal = () => {
    setIsModalBusStatus(false)
  }

  const [isModalLvStatus, setIsModalLvStatus] = useState(false)
  const showModalLvModal = () => setIsModalLvStatus(true);
  const closeLvModal = () => {
    setIsModalLvStatus(false)
  }

  const [isModalHlvStatus, setIsModalHlvStatus] = useState(false)
  const showModalHlvModal = () => setIsModalHlvStatus(true);
  const closeHlvModal = () => {
    setIsModalHlvStatus(false)
  }

  const [isConfirmEditStatusLv, setIsConfirmEditStatusLv] = useState(false)
  const showConfirmEditModalLv = () => setIsConfirmEditStatusLv(true);
  const closeConfirmEditModalLv = () => {
    setIsConfirmEditStatusLv(false)
  }

  const [isConfirmEditStatusBus, setIsConfirmEditStatusBus] = useState(false)
  const showConfirmEditModalBus = () => setIsConfirmEditStatusBus(true);
  const closeConfirmEditModalBus = () => {
    setIsConfirmEditStatusBus(false)
  }

  const [isConfirmEditStatusHlv, setIsConfirmEditStatusHlv] = useState(false)
  const showConfirmEditModalHlv = () => setIsConfirmEditStatusHlv(true);
  const closeConfirmEditModalHlv = () => {
    setIsConfirmEditStatusHlv(false)
  }

  const [isEditResult, setIsEditResult] = useState(false)
  const [editMessage, setEditMessage] = useState('');
  const [editStatus, setEditStatus] = useState(''); 
  const showEditModal = () => setIsEditResult(true);
  const closeEditModal = () => {
    setIsEditResult(false)
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
      field: 'unit_no',
      name: 'No Unit',
      truncateText: true,
    },
    {
      field: 'model',
      name: 'Model',
      truncateText: true,
      width: '300px',
    },
    {
      field: 'kategori',
      name: 'Kategori',
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
      field: 'is_active',
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
    item.unit_no.toLowerCase().includes(searchValue.toLowerCase()) 
    || item.model.toLowerCase().includes(searchValue.toLowerCase()) 
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
          setError(error);
        } 
      };
      if (opt) {  
        fetchTable(opt);
      }
    }, [opt]);

    useEffect(() => {
      const fetchStatusBus = async (opt) => {
        try {
          const res = await dailyService.statusBusQuo(opt.tanggal)
          if (res.status != 200) {
            throw new Error('Network response was not ok');
          }else if(res.status == 404){
            throw new Error('Gagal fetch data');
          }else{
            res.data.map((item) => {
              setFormBus({
                is_active: item.activated || false,
                quota: item.limited_quota || 0
              })
            })
          }
        } catch (error) {
          console.log(error)
          // setError(error);
        } 
      };

      const fetchStatusLV = async (opt) => {
        try {
          const res = await dailyService.statusLvQuo(opt.tanggal)
          if (res.status != 200) {
            throw new Error('Network response was not ok');
          }else if(res.status == 404){
            throw new Error('Gagal fetch data');
          }else{
            res.data.map((item) => {
              setFormLv({
                is_active: item.activated || false,
                quota: item.limited_quota || 0
              })
            })
          }
        } catch (error) {
          console.log(error)
        } 
      };

      const fetchStatusHlv = async (opt) => {
        try {
          const res = await dailyService.statusHlvQuo(opt.tanggal)
          if (res.status != 200) {
            throw new Error('Network response was not ok');
          }else if(res.status == 404){
            throw new Error('Gagal fetch data');
          }else{
            res.data.map((item) => {
              setFormHlv({
                is_active: item.activated || false,
                quota: item.limited_quota || 0
              })
            })
          }
        } catch (error) {
          console.log(error)
          // setError(error);
        } 
      };
      if (opt) {  
        fetchStatusBus(opt);
        fetchStatusLV(opt)
        fetchStatusHlv(opt)
      }
    }, [opt]);

    const handleSubmitBus = async() => {
      try {
        const updateList = {kategori: 'Bus', tanggal : opt.tanggal, ...formBus}
        const res = await dailyService.editableModel(updateList)
        if (res.status != 200) {
          setEditStatus('Error')
          setEditMessage('Oops..sepertinya ada kesalahan!')
          closeConfirmEditModalBus()
        }else{
          setEditStatus('Success!')
          setEditMessage('Model unit bus berhasil diupdate!')
          setTables(res.data)
          closeConfirmEditModalBus()
        }
      } catch (error) {
        setEditStatus('Error')
        setEditMessage('Yah, sepertinya ada yang error! ', error)
        closeConfirmEditModalBus()
      }finally{
        showEditModal()
      }
    }

    const handleSubmitLV = async() => {
      closeConfirmEditModalLv()
      try {
        const updateList = {kategori: 'LIGHT VEHICLE', model: 'TRITON', tanggal : opt.tanggal, ...formLv}
        const res = await dailyService.editableModel(updateList)
        if (res.status != 200) {
          setEditStatus('Error')
          setEditMessage('Oops..sepertinya ada kesalahan!')
          closeEditModal()
        }else{
          setEditStatus('Success!')
          setEditMessage('Model unit LV berhasil diupdate!')
          setTables(res.data)
          closeEditModal()
        }
      } catch (error) {
        setEditStatus('Error')
        setEditMessage('Yah, sepertinya ada yang error! ', error)
        closeConfirmEditModalLv()
      }finally{
        showEditModal()
      }
    }

    const handleSubmitHLV = async() => {
      closeConfirmEditModalHlv()
      try {
        const updateList = {kategori: 'BUS', model: 'COLT', tanggal : opt.tanggal, ...formHlv}
        const res = await dailyService.editableModel(updateList)
        if (res.status != 200) {
          setEditStatus('Error')
          setEditMessage('Oops..sepertinya ada kesalahan!')
          closeEditModal()
        }else{
          setEditStatus('Success!')
          setEditMessage('Model unit Hlv berhasil diupdate!')
          setTables(res.data)
          closeEditModal()
        }
      } catch (error) {
        setEditStatus('Error')
        setEditMessage('Yah, sepertinya ada yang error! ', error)
      }finally{
        showEditModal()
      }
    }

    const generateData = async() => {
      try {
        const res = await dailyService.insertData({tanggal: opt.tanggal})
        if (res.status != 200) {
          setTables(res.data)
          setConfirmStatus('Error')
          setConfirmMessage('Network response was not ok')
        }else{
          setConfirmStatus('Success!')
          setConfirmMessage('Data berhasil di generate.')
        }
        window.location.reload()
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
          isDisabled={tables.length > 0}
        >
          Generate data
        </EuiButton>
        {/* <EuiButton
          style={{ background: "#F04E98", color: "white" }}
          color="primary"
          onClick={showModalBusModal}
        >
          Editable Bus
        </EuiButton> */}
        <EuiButton
          style={{ background: "#FBBA6D", color: "white" }}
          color="primary"
          onClick={showModalLvModal}
        >
          Edit LV
        </EuiButton>
        <EuiButton
          style={{ background: "#73A33F", color: "white" }}
          color="primary"
          onClick={showModalHlvModal}
        >
          Edit BUS
        </EuiButton> 
      </>
    );

  return (
    <>
      <div style={{ marginBottom: '10px', display: "flex", justifyContent: "flex-end",gap:"15px",alignItems: "center" }}>
        
        <EuiFieldSearch
          placeholder="Search data" 
          value={searchValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          aria-label="Search data"
          style={{ marginRight: '10px' }}
        />
        <AddQuota/>
        {renderHeader()}
        
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

      {isModalBusStatus && (
        <EuiModal
          onClose={closeBusModal}
          initialFocus="[name=popswitch]"
          style={{ width: "880px" }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle >Submit Option</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiForm component="form">
              <EuiFlexGrid columns={2}>
                <EuiFormRow  style={{marginTop:"0px"}}label="Set Limited Quota">
                    <EuiFieldText 
                     name='quota'
                     placeholder='Quota'
                     value={formBus.quota}
                     onChange={(e) => setFormBus((prev) => ({ ...prev, quota: e.target.value }))}
                    />
                </EuiFormRow>
                <EuiFlexGrid columns={2}>
                    <EuiFormRow  style={{marginTop:"10px"}}label="Active">
                        <EuiCheckbox
                          id="is_active"
                          label="Enable"
                          checked={formBus.is_active === true} 
                          onChange={() => setFormBus((prev) => ({ ...prev, is_active: true }))}
                        />
                    </EuiFormRow>
                    <EuiFormRow  style={{marginTop:"30px"}}>
                        <EuiCheckbox
                          id="is_active"
                          label="Disable"
                          checked={formBus.is_active === false} 
                          onChange={() => setFormBus((prev) => ({ ...prev, is_active: false }))}
                        />
                    </EuiFormRow>
                </EuiFlexGrid>
              </EuiFlexGrid>
            </EuiForm>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton
              type="button" 
              style={{
                background: "White",
                color: "#73A33F",
                width: "100px",
              }}
              onClick={() => {
                closeBusModal(); 
              }}
              fill
            >
              Cancel
            </EuiButton>
            <EuiButton
             style={{
              background: "#73A33F",
              color: "white",
              width: "100px",
            }}
              type="button" 
              onClick={() => {
                closeBusModal(); 
                showConfirmEditModalBus()
              }}
              fill
            >
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

      {isConfirmEditStatusBus && (
        <EuiModal onClose={closeConfirmEditModalBus}>
        <EuiModalBody>
          <EuiText style={{
              fontSize: '22px',
              height: '25%',
              marginTop: '25px',
              color: confirmStatus === 'success' ? '#73A33F' : '#D52424',
              fontWeight: '600',
            }}>
            {confirmMessage}
          </EuiText>
          <EuiText style={{
              fontSize: '15px',
              height: '25%',
              marginTop: '35px'
            }}>
              Apakah anda ingin menyimpan perubahan ?
          </EuiText>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={handleSubmitBus} style={{ background: "#73A33F", color: "white" }}>
            Ya
          </EuiButton>
          <EuiButton onClick={closeConfirmEditModalBus} style={{ background: "crimson", color: "white" }}>
            Tutup
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
      )}

      {isModalLvStatus && (
        <EuiModal
          onClose={closeLvModal}
          initialFocus="[name=popswitch]"
          style={{ width: "880px" }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle >Submit Option</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiForm component="form">
              <EuiFlexGrid columns={2}>
                <EuiFormRow  style={{marginTop:"0px"}}label="Set Limited Quota">
                    <EuiFieldText 
                     name='quota'
                     placeholder='Quota'
                     value={formLv.quota}
                     onChange={(e) => setFormLv((prev) => ({ ...prev, quota: e.target.value }))}
                    />
                </EuiFormRow>
                <EuiFlexGrid columns={2}>
                    <EuiFormRow  style={{marginTop:"10px"}}label="Active">
                        <EuiCheckbox
                          id="is_active"
                          label="Enable"
                          checked={formLv.is_active === true} 
                          onChange={() => setFormLv((prev) => ({ ...prev, is_active: true }))}
                        />
                    </EuiFormRow>
                    <EuiFormRow  style={{marginTop:"30px"}}>
                        <EuiCheckbox
                          id="is_active"
                          label="Disable"
                          checked={formLv.is_active === false} 
                          onChange={() => setFormLv((prev) => ({ ...prev, is_active: false }))}
                        />
                    </EuiFormRow>
                </EuiFlexGrid>
              </EuiFlexGrid>
            </EuiForm>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton
              type="button" 
              style={{
                background: "White",
                color: "#73A33F",
                width: "100px",
              }}
              onClick={() => {
                closeLvModal(); 
              }}
              fill
            >
              Cancel
            </EuiButton>
            <EuiButton
             style={{
              background: "#73A33F",
              color: "white",
              width: "100px",
            }}
              type="button" 
              onClick={() => {
                closeLvModal(); 
                showConfirmEditModalLv()
              }}
              fill
            >
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

      {isConfirmEditStatusLv && (
        <EuiModal onClose={closeConfirmEditModalLv}>
        <EuiModalBody>
          <EuiText style={{
              fontSize: '22px',
              height: '25%',
              marginTop: '25px',
              color: confirmStatus === 'success' ? '#73A33F' : '#D52424',
              fontWeight: '600',
            }}>
            {confirmMessage}
          </EuiText>
          <EuiText style={{
              fontSize: '15px',
              height: '25%',
              marginTop: '35px'
            }}>
              Apakah anda ingin menyimpan perubahan ?
          </EuiText>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={handleSubmitLV} style={{ background: "#73A33F", color: "white" }}>
            Ya
          </EuiButton>
          <EuiButton onClick={closeConfirmEditModalLv} style={{ background: "crimson", color: "white" }}>
            Tutup
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
      )}

      {isModalHlvStatus && (
        <EuiModal
          onClose={closeHlvModal}
          initialFocus="[name=popswitch]"
          style={{ width: "880px" }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle >Submit Option</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiForm component="form">
              <EuiFlexGrid columns={2}>
                <EuiFormRow  style={{marginTop:"0px"}}label="Set Limited Quota">
                    <EuiFieldText 
                     name='quota'
                     placeholder='Quota'
                     value={formHlv.quota}
                     onChange={(e) => setFormHlv((prev) => ({ ...prev, quota: e.target.value }))}
                    />
                </EuiFormRow>
                <EuiFlexGrid columns={2}>
                    <EuiFormRow  style={{marginTop:"10px"}}label="Active">
                        <EuiCheckbox
                          id="is_active"
                          label="Enable"
                          checked={formHlv.is_active === true} 
                          onChange={() => setFormHlv((prev) => ({ ...prev, is_active: true }))}
                        />
                    </EuiFormRow>
                    <EuiFormRow  style={{marginTop:"30px"}}>
                        <EuiCheckbox
                          id="is_active"
                          label="Disable"
                          checked={formHlv.is_active === false} 
                          onChange={() => setFormHlv((prev) => ({ ...prev, is_active: false }))}
                        />
                    </EuiFormRow>
                </EuiFlexGrid>
              </EuiFlexGrid>
            </EuiForm>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton
              type="button" 
              style={{
                background: "White",
                color: "#73A33F",
                width: "100px",
              }}
              onClick={() => {
                closeHlvModal(); 
              }}
              fill
            >
              Cancel
            </EuiButton>
            <EuiButton
             style={{
              background: "#73A33F",
              color: "white",
              width: "100px",
            }}
              type="button" 
              onClick={() => {
                closeHlvModal(); 
                showConfirmEditModalHlv()
              }}
              fill
            >
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

      {isConfirmEditStatusHlv && (
        <EuiModal onClose={closeConfirmEditModalHlv}>
        <EuiModalBody>
          <EuiText style={{
              fontSize: '22px',
              height: '25%',
              marginTop: '25px',
              color: confirmStatus === 'success' ? '#73A33F' : '#D52424',
              fontWeight: '600',
            }}>
            {confirmMessage}
          </EuiText>
          <EuiText style={{
              fontSize: '15px',
              height: '25%',
              marginTop: '35px'
            }}>
              Apakah anda ingin menyimpan perubahan ?
          </EuiText>
        </EuiModalBody>

        <EuiModalFooter>
          <EuiButton onClick={handleSubmitHLV} style={{ background: "#73A33F", color: "white" }}>
            Ya
          </EuiButton>
          <EuiButton onClick={closeConfirmEditModalHlv} style={{ background: "crimson", color: "white" }}>
            Tutup
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
      )}

      {isEditResult && (
        <EuiModal>
          <EuiModalBody>
            <EuiText style={{
                fontSize: '22px',
                height: '25%',
                marginTop: '25px',
                color: editStatus === 'Success!' ? '#73A33F' : '#D52424' ,
                fontWeight: '600',
              }}>
              {editMessage}
            </EuiText>
            <EuiText style={{
                fontSize: '15px',
                height: '25%',
                marginTop: '35px'
              }}>
                {editStatus === 'Success!' ? 'Data berhasil terupdate. Silahkan kembali untuk menambah data atau ke halaman utama.'
                : 'Data belum terupdate. Silahkan kembali untuk update data atau ke halaman utama.'}
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeEditModal} style={{ background: "#73A33F", color: "white" }}>
              Tutup
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

    </>
  );
};

export default TableData;
