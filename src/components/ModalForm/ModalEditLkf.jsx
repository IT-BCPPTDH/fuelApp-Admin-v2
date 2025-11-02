import { useState, useEffect } from "react";
import {
  EuiButton,
  EuiFieldText,
  EuiFlexGrid,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  useGeneratedHtmlId,
  EuiText,
  EuiSelect,
} from "@elastic/eui";
import formService from "../../services/formDashboard";
import { useParams } from "react-router-dom";

const ModalEditLkf = () => {
  const { lkfId } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  const modalFormId = useGeneratedHtmlId({ prefix: "modalForm" });
  const modalTitleId = useGeneratedHtmlId();

  const user = JSON.parse(localStorage.getItem("user_data"));

  const [formData, setFormData] = useState({
    lkf_id: "",
    opening_dip: "",
    opening_sonding: "",
    closing_dip: "",
    closing_sonding: "",
    closing_data: "",
    variant: "",
    flow_meter_start: "",
    flow_meter_end: "",
    status: "",
  });

  const [editStatus, setEditStatus] = useState("");
  const [editMessage, setEditMessage] = useState("");
  const [isEditResult, setIsEditResult] = useState(false);

  const showEditModal = () => setIsEditResult(true);
  const closeEditModal = () => {
    setIsEditResult(false);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await formService.getDataById(lkfId);
      if (
        res.status === "200" &&
        Array.isArray(res.data) &&
        res.data.length > 0
      ) {
        const data = res.data[0];

        setFormData({
          lkf_id: data.lkf_id || "",
          opening_dip: data.opening_dip || "",
          opening_sonding: data.opening_sonding || "",
          closing_dip: data.closing_dip || "",
          closing_sonding: data.closing_sonding || "",
          // close_data: data.close_data || "",
          // variant: data.variant || "",
          flow_meter_start: data.flow_meter_start || "",
          flow_meter_end: data.flow_meter_end || "",
          status: data.status || "",
        });
      }
    };
    fetchData();
  }, [lkfId]);

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        updated_by: user?.JDE || "",
      };
      const res = await formService.updateLkf(payload);
      if (res.status === "200" || res.status === 200) {
        setEditStatus("Success");
        setEditMessage("Data successfully updated!");
      } else {
        setEditStatus("Failed");
        setEditMessage("Update failed. Please try again!");
      }
      showEditModal();
    } catch (err) {
      console.error(err);
      setEditStatus("Error");
      setEditMessage("Terjadi kesalahan saat update data!");
      showEditModal();
    }
  };

  return (
    <>
      <EuiButton onClick={showModal} color="primary" fill>
        Edit LKF
      </EuiButton>

      {isModalVisible && (
        <EuiModal
          onClose={closeModal}
          initialFocus="[name=opening_dip]"
          style={{ width: 600 }}
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}>
              Edit Data LKF {formData.lkf_id}
            </EuiModalHeaderTitle>
          </EuiModalHeader>

          <EuiModalBody>
            <EuiForm id={modalFormId} component="form">
              <EuiFlexGrid columns={2}>
                {Object.entries(formData)
                  .filter(([key]) => key !== "lkf_id")
                  .map(([key, value]) => (
                    <EuiFlexItem key={key}>
                      <EuiFormRow label={key.replace(/_/g, " ").toUpperCase()}>
                        {key === "status" ? (
                          <EuiSelect
                            options={[
                              { value: "Open", text: "Open" },
                              { value: "Close", text: "Close" },
                            ]}
                            value={formData.status}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                status: e.target.value,
                              })
                            }
                          />
                        ) : (
                          <EuiFieldText
                            name={key}
                            value={value || ""}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [key]: e.target.value,
                              })
                            }
                          />
                        )}
                      </EuiFormRow>
                    </EuiFlexItem>
                  ))}
              </EuiFlexGrid>
            </EuiForm>
          </EuiModalBody>

          <EuiModalFooter>
            <EuiButton onClick={closeModal} color="text">
              Cancel
            </EuiButton>
            <EuiButton onClick={handleSubmit} fill color="success">
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}

      {isEditResult && (
        <EuiModal onClose={closeEditModal}>
          <EuiModalHeader>
            <EuiModalHeaderTitle>{editStatus}</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <EuiText>{editMessage}</EuiText>
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton onClick={closeEditModal} fill>
              OK
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </>
  );
};

export default ModalEditLkf;
