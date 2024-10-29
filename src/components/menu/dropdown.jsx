import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { EuiButton, EuiIcon } from '@elastic/eui';
import './DropdownMenu.css';

const MenuDropdown = ({ items, buttonLabel= 'Dropdown', onItemClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <EuiButton
        color="light"
        className="dropdown-button"
        onClick={toggleDropdown}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {buttonLabel} <EuiIcon type="arrowDown" size="s" />
      </EuiButton>
      {isOpen && (
        <div className="dropdown-menu" role="menu">
          {items.map((item, index) => (
            <a
              key={index}
              href="#"
              onClick={(e) => {
                e.preventDefault();
                item.action();
                closeDropdown();
              }}
              className="dropdown-menu-item"
              role="menuitem"
              aria-label={item.label}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

MenuDropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
    })
  ).isRequired,
  buttonLabel: PropTypes.string,
};

// MenuDropdown.defaultProps = {
//   buttonLabel: 'Dropdown',
// };

export default MenuDropdown;
