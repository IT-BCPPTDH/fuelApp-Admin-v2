import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FluentProvider, createLightTheme } from '@fluentui/react-components';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RouteApp from './Routes';
import Cookies from 'js-cookie';

const dh = {
  palette: {
    themePrimary: '#0078D4', // Primary color
    themeSecondary: '#2B88D8', // Secondary color
    themeTertiary: '#71AFE5', // Tertiary color
    neutralPrimary: '#333333', // Primary text color
    neutralSecondary: '#666666', // Secondary text color
    neutralBackground: '#F4F4F4', // Background color
    brandBackground: '#0078D4'
  },
  color: {
    colorBrandBackground: '#0078D4',
    colorBrandForeground: '#FFFFFF',
    colorCompoundBrandStroke: '#000000',
  },
  typography: {
    defaultFontStyle: {
      fontFamily: '"Segoe UI", sans-serif',
    },
  }
};

const lightTheme = {
  ...createLightTheme(dh),
};

function App() {
  const [authen, setAuthen] = useState(() => {
    const userCookie = Cookies.get('token');
    return Boolean(userCookie);
  });

  useEffect(() => {
    const userCookie = Cookies.get('token');
    if (userCookie) {
      setAuthen(true);
    }
  }, []);  
  
  return (
    <FluentProvider theme={lightTheme}>
      <Router>
        <Routes>
        {
            !authen?(
              <Route path="*" element={<Login />} />
            ):(
              <Route
                path="*"
                element={
                  <div style={{ display: 'flex' }}>
                    <Sidebar />
                    <div style={{ flex: '1 1 auto' }}>
                      <Header />
                      <div className={`container container-overflow`}>
                        <RouteApp />
                      </div>
                    </div>
                  </div>
                }
              />
            )
        }
        </Routes>
      </Router>
    </FluentProvider>
  );
}

export default App;
