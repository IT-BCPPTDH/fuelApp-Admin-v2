import React, { useState,useEffect } from 'react';
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
  EuiAvatar,
  EuiIcon,
} from '@elastic/eui';
import Logo from "../../images/logo-dh-150.png";
import HeaderMasterDataMenu from './dropdown';
import MenuDropdown from '../menu/dropdown';
import Cookies from 'js-cookie';


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
    navigate('/unit-banlaws');
    navigate('/limited-quota-daily');
  };

  const handlebackHome = () => {
    navigate('/');

  };
  const handleQouta = () => {
    navigate('/add-data-qouta');

  };

  const handleChanges = () => {
    navigate('/change-password');

  };

  const menuItems = [
    { label: 'Report Lkf', action: () => navigate('/report-lkf') },

  ];

  const menuItemstMaster = [
    { label: 'Equipment', action: () => navigate('/equipment') },
    { label: 'Limited Quota', action: () => navigate('/limited-quota-daily') },
    { label: 'Master Data Elipse', action: () => navigate('/master-elipse') },
    { label: 'Sonding Master', action: () => navigate('/master-stock-system') },
    { label: 'Station', action: () => navigate('/master-station') },
    { label: 'Unit Banlaws', action: () => navigate('/unit-banlaws') },
    { label: 'User', action: () => navigate('/user') },
  ];


  return (
    <EuiHeader>
      <div className='logo'>
        <EuiImage src={Logo} alt='' style={{width:"90px",height:"50px", marginLeft:"-10px"}} />
      </div >
      <div className='nav-lf'><EuiButton color="light" onClick={handlebackHome} >
      <EuiIcon type="home"/>
        Home
      </EuiButton>
      <MenuDropdown
        items={menuItems}
        buttonLabel="LKF"
        onItemClick={handleItemClick}
      />
            <EuiButton color="light" onClick={handleQouta}>Tambah Quota</EuiButton>
      <MenuDropdown
        items={menuItemstMaster}
        buttonLabel="Master"
        onItemClick={handleClickMaster}
      />
      <EuiButton color="light" onClick={handleChanges}>Change Password</EuiButton>
      

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


const getInitials = (fullname) => {
  if (!fullname) return '';
  
  const names = fullname.split(' ');
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  
  return names.map(name => name.charAt(0).toUpperCase()).join('');
};

const HeaderUserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState({ fullname: '', position: '' });

  useEffect(() => {
    // Fetch user data from localStorage when the component mounts
    const user = localStorage.getItem('user_data'); // Fetch from localStorage

    if (user) {
      try {
        // Parse the JSON data
        const parsedUser = JSON.parse(user);

        // Set the state with the user data
        setUserData({
          fullname: parsedUser.fullname || 'Unknown',
          position: parsedUser.position || 'Unknown'
        });
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        // Handle the case where parsing fails
        setUserData({ fullname: 'Unknown', position: 'Unknown' });
      }
    }
  }, []);

  const onMenuButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handlelLogout = () => {
    localStorage.removeItem('user_data'); 
    Cookies.remove('token')
    Cookies.remove('user')
    window.location.replace('/');
  }

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
         <EuiAvatar
            name={userData.fullname}
            size="s"
            style={{
              width: 30,
              height: 30,
            }}
          >
            {getInitials(userData.fullname)}
          </EuiAvatar>
        </EuiHeaderSectionItemButton>
      }
      isOpen={isOpen}
      anchorPosition="downRight"
      closePopover={closeMenu}
      panelPaddingSize="m"
    >
      <div style={{ width: 300 }}>
        <EuiText>
          <p>Name: {userData.fullname}</p>
        </EuiText>
        <EuiText>
          <p>Position: {userData.position}</p>
        </EuiText>
        <EuiText>
          <EuiLink onClick={handlelLogout}>Log out</EuiLink>
        </EuiText>
      </div>
    </EuiPopover>
  );
};

const HeaderAppMenu = () => {
  return null; 
};

export default NavTop;
