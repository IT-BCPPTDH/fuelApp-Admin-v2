import React, { useState } from 'react';
import { EuiRadioGroup, useGeneratedHtmlId } from '@elastic/eui';
import './css.css'; // Import custom CSS file

const DynamicRadioGroup = ({
  options = [],
  defaultSelectedId,
  legendText,
  name = 'radio group',
  canLoading = false,
  canReadOnly = false,
  canInvalid = false,
  canFullWidth = false
}) => {
  // Check if options is an array and not empty
  if (!Array.isArray(options) || options.length === 0) {
    return null; // Optionally, handle empty options case differently
  }

  // Generate unique IDs for radio group items if not provided
  const generatedIds = options.reduce((acc, option, index) => {
    if (!option.id) {
      acc[`radioGroupItem_${index}`] = useGeneratedHtmlId({
        prefix: 'radioGroupItem',
        suffix: String(index),
      });
    }
    return acc;
  }, {});

  // Ensure options have IDs
  const preparedOptions = options.map((option, index) => ({
    ...option,
    id: option.id || generatedIds[`radioGroupItem_${index}`],
  }));

  const [radioIdSelected, setRadioIdSelected] = useState(defaultSelectedId);

  const onChange = (optionId) => {
    setRadioIdSelected(optionId);
  };

  return (
    <div className="horizontal-radio-group">
      <EuiRadioGroup
        options={preparedOptions}
        idSelected={radioIdSelected}
        onChange={onChange}
        name={name}
        legend={{
          children: <span>{legendText}</span>,
        }}
      />
    </div>
  );
};

export default DynamicRadioGroup;
