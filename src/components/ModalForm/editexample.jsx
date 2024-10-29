import React, { useState, useEffect } from 'react';
import {
  EuiButton,
  EuiDatePicker,
  EuiFieldText,
  EuiFlexGrid,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiRadio,
  EuiSelect,
  EuiTextArea,
  useGeneratedHtmlId,
  EuiButtonIcon,
  EuiText
} from '@elastic/eui';
import moment from 'moment';
import UserService from '../../services/UserService';
import EquipService from '../../services/EquiptmentService';
import formService from '../../services/formDashboard';

const ModalFormDataEdit = ({ row }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    from_data_id: row.from_data_id || "",
    no_unit: row.no_unit || "",
    model_unit: row.model_unit || "",
    owner: row.owner || "",
    date_trx: row.date_trx || "",
    qty_last: row.qty_last || "",
    qty: row.qty || "",
    flow_start: row.flow_start || "",
    flow_end: row.flow_end || "",
    jde_operator: row.jde_operator || "",
  });
  
  const [userData, setUserData] = useState([]);
  const [equipData, setEquipData] = useState([]);
  const [editMessage, setEditMessage] = useState('');
  const [editStatus, setEditStatus] = useState('');
  
  const closeModal = () => setIsModalVisible(false);
  
  useEffect(() => {
    const fetchUnit = async () => {
      try {
        const res = await EquipService.getEquip();
        if (res.status === 200) {
          setEquipData(res.data);
        } else {
          setEquipData([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await UserService.getAllUser();
        if (res.status === 200) {
          setUserData(res.data);
        } else {
          setUserData([]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnit();
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitData = async () => {
    try {
      const res = await formService.updateData({ id: row.id, ...formData });
      if (res.status === 200) {
        setEditStatus('Success');
        setEditMessage('Data successfully saved!');
      } else {
        throw new Error('Data not saved! Please try again.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      setEditStatus('Error');
      setEditMessage('Terjadi kesalahan saat update data. Data tidak tersimpan!');
    } finally {
      closeModal(); // Close the modal after submission
    }
  };

  return (
    <>
      <EuiButtonIcon iconType="pencil" onClick={() => setIsModalVisible(true)}>Edit</EuiButtonIcon>
      {isModalVisible && (
        <EuiModal onClose={closeModal} style={{ width: "880px" }}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>Edit Transaksi</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiForm>
              <EuiFlexGrid columns={2}>
                <EuiFormRow label="No Unit">
                  <EuiSelect
                    options={equipData.map(item => ({ value: item.unit_no, text: item.unit_no }))}
                    name="no_unit"
                    value={formData.no_unit}
                    onChange={handleChange}
                    hasNoInitialSelection
                  />
                </EuiFormRow>
                <EuiFormRow label="Model Unit">
                  <EuiFieldText
                    name='model_unit'
                    value={formData.model_unit}
                    onChange={handleChange}
                    disabled
                  />
                </EuiFormRow>
                <EuiFormRow label="Owner">
                  <EuiFieldText
                    name='owner'
                    value={formData.owner}
                    onChange={handleChange}
                    disabled
                  />
                </EuiFormRow>
                <EuiFormRow label="Qty">
                  <EuiFieldText
                    name='qty'
                    value={formData.qty}
                    onChange={handleChange}
                  />
                </EuiFormRow>
                {/* Additional form fields go here */}
              </EuiFlexGrid>
            </EuiForm>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeModal} fill>Cancel</EuiButton>
            <EuiButton onClick={handleSubmitData} fill>Save</EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
      {editStatus && (
        <EuiModal>
          <EuiModalBody>
            <EuiText color={editStatus === 'Success' ? 'green' : 'danger'}>
              {editMessage}
            </EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeModal}>Close</EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </>
  );
};

export default ModalFormDataEdit;
