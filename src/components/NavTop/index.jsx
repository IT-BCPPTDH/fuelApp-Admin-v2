import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EuiHeader,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiImage,
  EuiButton,
  EuiListGroup,
  EuiListGroupItem,
  EuiPopover,
  EuiText,
  EuiLink,
} from '@elastic/eui';
import Logo from "../../images/logo_darma_henwa.png";
import HeaderMasterDataMenu from './dropdown';
import MenuDropdown from '../menu/dropdown';

const NavTop = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (itemLabel) => {
    setActiveItem(itemLabel);
    navigate('/report-fuel');

  };

  const handleClickMaster = (itemLabel) => {
    setActiveItem(itemLabel);
    navigate('/master-station');
    navigate('/master-stock-system');
    navigate('/master-elipse');

  };

  const handlebackHome = () => {
    navigate('/');

  };
  const handleQouta = () => {
    navigate('/add-data-qouta');

  };

  
  

  const menuItems = [
    { label: 'Report Lkf', action: () => navigate('/report-lkf') },

  ];

  const menuItemstMaster = [
    { label: 'Station', action: () => navigate('/master-station') },
    { label: 'Equipment', action: () => navigate('/another-item') },
    { label: 'Stock System', action: () => navigate('/master-stock-system') },
    { label: 'Master Data Elipse', action: () => navigate('/master-elipse') },
    { label: 'User', action: () => navigate('/another-item') },
  ];


  return (
    <EuiHeader>
      <div className='logo'>
        <EuiImage src={Logo} alt='' />
      </div >
      <div className='nav-lf'><EuiButton color="light" onClick={handlebackHome}>Fuel History</EuiButton>
      <MenuDropdown
        items={menuItems}
        buttonLabel="LKF"
        onItemClick={handleItemClick}
      />
            <EuiButton color="light" onClick={handleQouta}>Tambah Kouta</EuiButton>
      <MenuDropdown
        items={menuItemstMaster}
        buttonLabel="Master"
        onItemClick={handleClickMaster}
      />
      <EuiButton color="light">Change Password</EuiButton>
      

      </div>
      <EuiHeaderSection side="right">
        <EuiHeaderSectionItem>
          <HeaderUserMenu />
        </EuiHeaderSectionItem>
        <EuiHeaderSectionItem>
          <HeaderAppMenu />
        </EuiHeaderSectionItem>
      </EuiHeaderSection>
    </EuiHeader>
  );
};

const HeaderUserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <EuiPopover
      id="headerUserPopover"
      button={
        <EuiHeaderSectionItemButton
          aria-controls="headerUserPopover"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Account menu"
          onClick={onMenuButtonClick}
        >
          <EuiButton name="John Username" size="s" />
        </EuiHeaderSectionItemButton>
      }
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="m"
    >
      <div style={{ width: 300 }}>
        <EuiText>
          <p>John Username</p>
        </EuiText>
        <EuiText>
          <EuiLink>Edit profile</EuiLink>
        </EuiText>
        <EuiText>
          <EuiLink>Log out</EuiLink>
        </EuiText>
      </div>
    </EuiPopover>
  );
};

const HeaderAppMenu = () => {
  return null; 
};

export default NavTop;
