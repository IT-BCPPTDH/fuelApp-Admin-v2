import React, { useState } from 'react';
import {
  EuiButton,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiSwitch,
  EuiSuperSelect,
  EuiText,
  useGeneratedHtmlId,
} from '@elastic/eui';

const superSelectOptions = [
  {
    value: 'option_one',
    inputDisplay: 'Option one',
    dropdownDisplay: (
      <>
        <strong>Option one</strong>
        <EuiText size="s" color="subdued">
          <p>Has a short description giving more detail to the option.</p>
        </EuiText>
      </>
    ),
  },
  {
    value: 'option_two',
    inputDisplay: 'Option two',
    dropdownDisplay: (
      <>
        <strong>Option two</strong>
        <EuiText size="s" color="subdued">
          <p>Has a short description giving more detail to the option.</p>
        </EuiText>
      </>
    ),
  },
  {
    value: 'option_three',
    inputDisplay: 'Option three',
    dropdownDisplay: (
      <>
        <strong>Option three</strong>
        <EuiText size="s" color="subdued">
          <p>Has a short description giving more detail to the option.</p>
        </EuiText>
      </>
    ),
  },
];

const ExampleForm = ({ id }: { id?: string }) => {
  const modalFormSwitchId = useGeneratedHtmlId({ prefix: 'modalFormSwitch' });
  const [isSwitchChecked, setIsSwitchChecked] = useState(true);
  const [superSelectValue, setSuperSelectValue] = useState('option_one');

  const onSwitchChange = () => setIsSwitchChecked(!isSwitchChecked);
  const onSuperSelectChange = (value: string) => setSuperSelectValue(value);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form submitted with values:', { isSwitchChecked, superSelectValue });
  };

  return (
    <EuiForm id={id} component="form" onSubmit={handleSubmit}>
      <EuiFormRow label="Super Select">
        <EuiSuperSelect
          options={superSelectOptions}
          valueOfSelected={superSelectValue}
          onChange={onSuperSelectChange}
        />
      </EuiFormRow>
      <EuiFormRow label="Switch">
        <EuiSwitch
          id={modalFormSwitchId}
          checked={isSwitchChecked}
          onChange={onSwitchChange}
          label="Enable feature"
        />
      </EuiFormRow>
      {/* Add more form fields as needed */}
    </EuiForm>
  );
};

const ModalForm = () => {
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
            <EuiModalHeaderTitle id={modalTitleId}>Modal title</EuiModalHeaderTitle>
          </EuiModalHeader>
          <EuiModalBody>
            <ExampleForm id={modalFormId} />
          </EuiModalBody>
          <EuiModalFooter>
            <EuiButton
              type="submit"
              form={modalFormId}
              onClick={() => {
                closeModal(); // Close the modal on button click
              }}
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

export default ModalForm;
