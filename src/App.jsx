import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  FluentProvider,
  createLightTheme,
} from '@fluentui/react-components';
import Login from './pages/Login';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import RouteApp from './Routes';
import './style.css';

const dh = {
  palette: {
    themePrimary: '#0078D4', // Primary color
    themeSecondary: '#2B88D8', // Secondary color
    themeTertiary: '#71AFE5', // Tertiary color
    neutralPrimary: '#333333', // Primary text color
    neutralSecondary: '#666666', // Secondary text color
    neutralBackground: '#F4F4F4', // Background color
  },
  typography: {
    defaultFontStyle: {
      fontFamily: '"Segoe UI", sans-serif',
    },
  },
 
};

const lightTheme = {
  ...createLightTheme(dh),
};

function App() {
  return (
    <FluentProvider theme={lightTheme}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: '1 1 auto' }}>
                  <Header />
                  <div className={`container`}>
                    <RouteApp />
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </Router>
    </FluentProvider>
  );
}

export default App;
