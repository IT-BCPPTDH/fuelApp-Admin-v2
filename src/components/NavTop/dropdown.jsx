import React, { useState } from 'react';
import { EuiPopover, EuiButton } from '@elastic/eui';
import PropTypes from 'prop-types';

const HeaderMasterDataMenu = ({ buttonLabel, dropdownContent, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <EuiPopover
      id="headerMasterDataPopover"
      button={
        <EuiButton     
          style={{ background: 'white', color: 'ButtonText' }}
          size="s"
          onClick={() => {
            onClick && onClick(); 
            onMenuButtonClick();
          }}
        >
          {buttonLabel}
        </EuiButton>
      }
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="m"
    >
      {dropdownContent }
      
    </EuiPopover>
  );
};

HeaderMasterDataMenu.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  dropdownContent: PropTypes.node.isRequired,
  onClick: PropTypes.func, 
};

export default HeaderMasterDataMenu;
