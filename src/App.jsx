import { FluentProvider, createLightTheme } from '@fluentui/react-components';
import RouteApp from './Routes';
import UserRoleProvider from './context/UserRoleProvider';
import { AuthProvider } from './context/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';

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
  return (
    <FluentProvider theme={lightTheme}>
      <AuthProvider>
        <UserRoleProvider>
          <ErrorBoundary>
            <RouteApp />
          </ErrorBoundary>
        </UserRoleProvider>
      </AuthProvider>
    </FluentProvider>
  );
}

export default App;