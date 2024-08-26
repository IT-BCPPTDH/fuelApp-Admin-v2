import React, { useState } from 'react';
import './DropdownMenu.css'; // Ensure to create this CSS file
import { EuiButton, EuiIcon } from '@elastic/eui';

const DropdownMenu = ({ items = [], buttonLabel = 'Dropdown', onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleItemClick = (item) => {
    if (onItemClick) {
      onItemClick(item);
    }
    closeDropdown();
  };

  return (
    <div className="dropdown">
      <EuiButton color="light" className="dropdown-button" onClick={toggleDropdown}>
        {buttonLabel} <span>
          <EuiIcon type="arrowDown" size="xs" />
        </span>
      </EuiButton>
      {isOpen && (
        <div className="dropdown-menu">
          {items.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleItemClick(item);
              }}
              className="dropdown-menu-item"
            >
              <span style={{ fontSize: '14px' }}>{item.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
