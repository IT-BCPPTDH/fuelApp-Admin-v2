import React, { useState } from 'react';
import { EuiSelect, EuiIcon } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css'; // Ensure your app is using the EUI theme

const CustomSelect = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'relative' }}>
      <EuiSelect
        options={options}
        value={value}
        onChange={onChange}
        fullWidth
        aria-label="Custom Select"
      />
      <EuiIcon
        type={isOpen ? 'arrowUp' : 'arrowDown'}
        onClick={toggleDropdown}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
        aria-label={isOpen ? 'Close dropdown' : 'Open dropdown'}
      />
    </div>
  );
};

export default CustomSelect;
