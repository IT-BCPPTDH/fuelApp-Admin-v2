import React, { useState, useEffect } from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiFlexGrid,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  useGeneratedHtmlId,
  EuiButtonIcon,
  EuiText,
  EuiOverlayMask,
} from '@elastic/eui';
import EquipService from '../../services/EquiptmentService'; // Pastikan path ini benar

/**
 * Komponen untuk mengedit dan menghapus data equipment melalui modal.
 *
 * @param {object} row - Objek data untuk baris yang akan diedit/dihapus.
 * @param {function} onActionComplete - Callback function yang dipanggil setelah aksi (edit/hapus) berhasil, untuk me-refresh data di komponen induk.
 */
const ModalEditEquipment = ({ row, onActionComplete }) => {
  const [formData, setFormData] = useState({});
  const [initialData, setInitialData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // State tunggal untuk mengelola semua modal
  // Tipe yang mungkin: 'closed', 'editing', 'confirmDelete', 'result'
  const [modalState, setModalState] = useState({ type: 'closed' });

  const user = JSON.parse(localStorage.getItem('user_data'));
  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });

  // Mengisi form data ketika modal edit dibuka
  useEffect(() => {
    if (modalState.type === 'editing') {
      const dataToEdit = {
        unit_no: row.unit_no || "",
        brand: row.brand || "",
        type: row.type || "",
        tank_cap: row.tank_cap || "",
        category: row.category || "",
        usage: row.usage || "",
        site: row.site || "",
        owner: row.owner || "",
      };
      setFormData(dataToEdit);
      setInitialData(dataToEdit); // Simpan data awal untuk perbandingan
    }
  }, [row, modalState.type]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const closeModal = () => {
    setModalState({ type: 'closed' });
  };

  // Handler untuk form submit (aksi Save)
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    // 1. Cek apakah ada perubahan
    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);
    if (!hasChanges) {
      setModalState({
        type: 'result',
        status: 'info',
        message: 'Tidak ada perubahan data yang perlu disimpan.',
      });
      return; // Hentikan fungsi
    }

    // 2. Jika ada perubahan, lanjutkan ke API
    setIsLoading(true);
    try {
      const updateList = { id: row.id, ...formData, updated_by: user.JDE };
      console.log("Mengirim data untuk diupdate:", updateList);

      // Uncomment baris ini saat service siap digunakan
      const res = await EquipService.updateEquip(updateList);
      if (res.status !== '200') {
        throw new Error('Gagal menyimpan data ke server.');
      }
      
      // Simulasi sukses
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      setModalState({ type: 'result', status: 'success', message: 'Data equipment berhasil diperbarui!' });

    } catch (error) {
      setModalState({ type: 'result', status: 'error', message: error.message || 'Terjadi kesalahan saat menyimpan data.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handler untuk aksi hapus
  const handleDelete = async () => {
    setIsLoading(true);
    try {
      console.log("Menghapus data dengan ID:", row.id);

      // Uncomment baris ini saat service siap digunakan
      const res = await EquipService.delEquip(row.id);
      if (res.status !== '200') {
        throw new Error('Gagal menghapus data dari server.');
      }
      
      // Simulasi sukses
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      setModalState({ type: 'result', status: 'success', message: 'Data equipment berhasil dihapus.' });
    } catch (error) {
      setModalState({ type: 'result', status: 'error', message: error.message || 'Terjadi kesalahan saat menghapus data.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handler saat modal hasil ditutup
  const handleResultModalClose = () => {
    // Jika aksi sebelumnya sukses, panggil callback untuk refresh tabel
    if (modalState.status === 'success') {
      if (typeof onActionComplete === 'function') {
        onActionComplete();
      }
    }
    closeModal();
  };

  // Fungsi untuk me-render modal yang sesuai berdasarkan state
  const renderModalContent = () => {
    switch (modalState.type) {
      case 'editing':
        return (
          <EuiModal onClose={closeModal} style={{ width: "880px" }}>
            <EuiModalHeader>
              <EuiModalHeaderTitle>Edit Equipment</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiForm id={modalFormId} component="form" onSubmit={handleEditSubmit}>
              <EuiModalBody>
                <EuiFlexGrid columns={2} gutterSize="l">
                  <EuiFormRow label="Unit No"  style={{marginTop:"15px"}}>
                    <EuiFieldText name='unit_no' value={formData.unit_no} onChange={handleChange} />
                  </EuiFormRow>
                  <EuiFormRow label="Brand / Description" >
                    <EuiFieldText name='brand' value={formData.brand} onChange={handleChange} />
                  </EuiFormRow>
                  <EuiFormRow label="Tipe Unit">
                    <EuiFieldText name='type' value={formData.type} onChange={handleChange} />
                  </EuiFormRow>
                  {/* <EuiFormRow label="Tank Capacity/L">
                    <EuiFieldText name='tank_cap' value={formData.tank_cap} onChange={handleChange} />
                  </EuiFormRow> */}
                  <EuiFormRow label="Category">
                    <EuiFieldText name='category' value={formData.category} onChange={handleChange} />
                  </EuiFormRow>
                  <EuiFormRow label="Usage">
                    <EuiFieldText name='usage' value={formData.usage} onChange={handleChange} />
                  </EuiFormRow>
                  <EuiFormRow label="Site">
                    <EuiFieldText name='site' value={formData.site} onChange={handleChange} />
                  </EuiFormRow>
                  <EuiFormRow label="Owner">
                    <EuiFieldText name='owner' value={formData.owner} onChange={handleChange} />
                  </EuiFormRow>
                </EuiFlexGrid>
              </EuiModalBody>
              <EuiModalFooter>
                <EuiButton onClick={closeModal} color="text">Cancel</EuiButton>
                <EuiButton type="submit" form={modalFormId} fill isLoading={isLoading} 
                style={{ background: "#73A33F", color: "white" }}>Save Changes</EuiButton>
              </EuiModalFooter>
            </EuiForm>
          </EuiModal>
        );

      case 'confirmDelete':
        return (
          <EuiModal onClose={closeModal} >
            {/* <EuiModalHeader>
              <EuiModalHeaderTitle style={{
                color: "#73A33F"
              }}>Confirm Deletion</EuiModalHeaderTitle>
            </EuiModalHeader> */}
            <EuiModalBody >
              <EuiText style={{paddingTop:"5%"}}>Apakah Anda yakin ingin menghapus data equipment: <strong>{row.unit_no}</strong>?</EuiText>
            </EuiModalBody>
            <EuiModalFooter>
              <EuiButton onClick={closeModal} style={{ background: "#73A33F", color: "white" }}>Cancel</EuiButton>
              <EuiButton onClick={handleDelete} color="danger" fill isLoading={isLoading}>Delete</EuiButton>
            </EuiModalFooter>
          </EuiModal>
        );

      case 'result':
         const { status, message } = modalState;
        let title, colorName; 
        if (status === 'success') {
          title = 'Success!';
          colorName = '#73A33F'; // Nama warna EUI
        } else if (status === 'info') {
          title = 'Information';
          colorName = 'primary'; // Nama warna EUI
        } else {
          title = 'Error';
          colorName = 'danger'; // Nama warna EUI
        }
        return (
          <EuiModal onClose={handleResultModalClose}>
            <EuiModalHeader>
                <EuiModalHeaderTitle style={{ 
                  color: status === 'success' 
                    ? '#73A33F' 
                    : status === 'error' 
                      ? '#D52424' 
                      : '#090b0cff' 
                }}
              >{title}</EuiModalHeaderTitle>
            </EuiModalHeader>
            <EuiModalBody>
              <EuiText ><p>{message}</p></EuiText>
            </EuiModalBody>
            <EuiModalFooter>
              <EuiButton onClick={handleResultModalClose} 
              style={{
                background: "#73A33F",
                color: "white",
                width: "100px",
              }}
              >Close</EuiButton>
            </EuiModalFooter>
          </EuiModal>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <EuiButtonIcon
        iconType="pencil"
        aria-label="Edit"
        onClick={() => setModalState({ type: 'editing' })}
      />
      <EuiButtonIcon
        iconType="trash"
        aria-label="Delete"
        color="danger"
        onClick={() => setModalState({ type: 'confirmDelete' })}
      />

      {/* Tampilkan overlay saat loading untuk menonaktifkan interaksi lain */}
      {isLoading && <EuiOverlayMask />}

      {/* Render modal aktif */}
      {renderModalContent()}
    </>
  );
};

export default ModalEditEquipment;