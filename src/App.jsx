import { BrowserRouter as Router} from 'react-router-dom'
import {
  FluentProvider,
  createLightTheme
} from '@fluentui/react-components'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import './style.css'
import RouteApp from './Routes'

function App () {
  const dh = {
    10: '#020402',
    20: '#141B10',
    30: '#1F2D18',
    40: '#263A1D',
    50: '#2E4823',
    60: '#365628',
    70: '#3D652D',
    80: '#457433',
    90: '#4E8338',
    100: '#56923D',
    110: '#5EA243',
    120: '#66B248',
    130: '#7BC15E',
    140: '#96CD7D',
    150: '#AFD99B',
    160: '#C9E5BA'
  }

  const lightTheme = {
    ...createLightTheme(dh)
  }

  return (
    <FluentProvider theme={lightTheme}>
      <Router>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <div style={{ flex: '1 1 auto' }}>
            <Header />
            <div className={`container`}>
             <RouteApp />
            </div>
          </div>
        </div>
      </Router>
    </FluentProvider>
  )
}

export default App
