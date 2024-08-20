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

const NavTop = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (itemLabel) => {
    setActiveItem(itemLabel);
    navigate('/report-fuel');

  };
  const dropdownContent = (
    <div style={{ width: 300 }}>
      <EuiListGroup>
        <EuiListGroupItem
          style={{
            background: activeItem === "Report LKF" ? "#73a440" : "transparent",
            color: activeItem === "Report LKF" ? "white" : "black"
          }}
          label="Report LKF"
          onClick={(e) => {
            e.preventDefault();
            handleItemClick("Report LKF");

            
          }}
        />
      </EuiListGroup>
    </div>
  );

  const dropdownContentKouta = (
    <div style={{ width: 300 }}>
      <EuiListGroup>
        <EuiListGroupItem
          style={{
            background: activeItem === "List Monitoring" ? "#73a440" : "transparent",
            color: activeItem === "List Monitoring" ? "white" : "black"
          }}
          label="List Monitoring"
          onClick={(e) => {
            e.preventDefault();
            handleItemClick("List Monitoring");
            console.log("List Monitoring clicked");
          }}
        />
      </EuiListGroup>
    </div>
  );

  const dropdownContentMaster = (
    <div style={{ width: 300 }}>
      <EuiListGroup>
        <EuiListGroupItem
          style={{
            background: activeItem === "Add Master Equipment" ? "#73a440" : "transparent",
            color: activeItem === "Add Master Equipment" ? "white" : "black"
          }}
          label="Add Master Equipment"
          onClick={(e) => {
            e.preventDefault();
            handleItemClick("Add Master Equipment");
            console.log("Add Master Equipment clicked");
          }}
        />
        <EuiListGroupItem
          style={{
            background: activeItem === "Add Master Operator" ? "#73a440" : "transparent",
            color: activeItem === "Add Master Operator" ? "white" : "black"
          }}
          label="Add Master Operator"
          onClick={(e) => {
            e.preventDefault();
            handleItemClick("Add Master Operator");
            console.log("Add Master Operator clicked");
          }}
        />
      </EuiListGroup>
    </div>
  );

  return (
    <EuiHeader>
      <div className='logo'>
        <EuiImage src={Logo} alt='' />
      </div>
      <HeaderMasterDataMenu
        buttonLabel="Fuel History"
        dropdownContent={<div>Fuel History Content</div>} 
      />
      <HeaderMasterDataMenu
        buttonLabel="LKF"
        dropdownContent={dropdownContent}
      />
      <HeaderMasterDataMenu
        buttonLabel="Tambah Kouta"
        dropdownContent={dropdownContentKouta}
      />
      <HeaderMasterDataMenu
        buttonLabel="Master Data"
        dropdownContent={dropdownContentMaster}
      />
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
