import React, { useState } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiIcon,
  useGeneratedHtmlId,
} from '@elastic/eui';

const FormModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const modalFormId = useGeneratedHtmlId({ prefix: 'modalForm' });
  const modalTitleId = useGeneratedHtmlId();

  return (
    <>
      <EuiButton onClick={showModal}>Show form modal</EuiButton>
      {isModalVisible && (
        <EuiModal
          aria-labelledby={modalTitleId}
          onClose={closeModal}
          initialFocus="[name=popswitch]"
        >
          <EuiModalHeader>
            <EuiModalHeaderTitle id={modalTitleId}>
              Modal title
            </EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            {/* Your form content goes here */}
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButtonEmpty
              iconType="cross" // Add the cross icon here
              onClick={closeModal}
              aria-label="Close modal"
            >
              {/* The button text is optional; you can remove it if only the icon is needed */}
            </EuiButtonEmpty>
            <EuiButton
              type="submit"
              form={modalFormId}
              onClick={closeModal}
              fill
            >
              Save
            </EuiButton>
          </EuiModalFooter>
        </EuiModal>
      )}
    </>
  );
};

export default FormModal;
