import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserRoleContext from './UserRoleContext';
import Cookies from 'js-cookie';

const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState({});

  useEffect(() => {
    let user = Cookies.get('user')
    if(user){
      user = JSON.parse(user)

      setUserRole({role: user.division ?? 'guest'})
    }
  
  }, []);

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};

export default UserRoleProvider;
UserRoleProvider.propTypes={
    children: PropTypes.any
}