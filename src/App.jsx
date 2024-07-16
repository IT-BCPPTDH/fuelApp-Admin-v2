import { EuiProvider } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import RouteApp from './Routes';

import UserRoleProvider from './context/UserRoleProvider';
import { AuthProvider } from './context/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  return (
    <EuiProvider colorMode="light">
      <AuthProvider>
        <UserRoleProvider>
          <ErrorBoundary>
            <RouteApp />
          </ErrorBoundary>
        </UserRoleProvider>
      </AuthProvider>
    </EuiProvider>
  );
}

export default App;