import React from 'react';
import Navtop from "./NavTop"; 

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
