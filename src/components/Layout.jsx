import Sidebar from "./Sidebar"
import Header from "./Header"
import PropTypes from 'prop-types'

const LayoutTemplate = ({ children }) => {
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: '1 1 auto' }}>
          <Header />
          <div className={`container container-overflow`}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  export default LayoutTemplate

  LayoutTemplate.propTypes = {
    children: PropTypes.any
  }