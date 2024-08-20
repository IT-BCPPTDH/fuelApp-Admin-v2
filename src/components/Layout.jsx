import React from 'react';
import Navtop from "./NavTop"
const Layout = () => {

    return(
        <div>
        <Navtop />
        <main>
          {children}
        </main>
      </div>
    )
}

export default Layout