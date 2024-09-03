import React from 'react';
import Navtop from "./NavTop"; 
import PropTypes from 'prop-types'
const Layout = ({ children }) => { 
  return (
    <div>
      <Navtop />
      <main>
        {children} 
      </main>
    </div>
  );
}

export default Layout;
Layout.propTypes = {
  children: PropTypes.any
}