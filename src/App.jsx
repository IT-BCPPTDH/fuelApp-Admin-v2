import { EuiProvider } from '@elastic/eui';

import RouteApp from './Routes';

import UserRoleProvider from './context/UserRoleProvider';
import { AuthProvider } from './context/AuthProvider';
import ErrorBoundary from './components/ErrorBoundary';

import { appendIconComponentCache } from '@elastic/eui/es/components/icon/icon';

import { icon as EuiIconArrowDown } from '@elastic/eui/es/components/icon/assets/arrow_down';
import { icon as EuiIconArrowLeft } from '@elastic/eui/es/components/icon/assets/arrow_left';
import {icon as EuiIconLock} from '@elastic/eui/es/components/icon/assets/lock';
import {icon as EuiIconUser} from '@elastic/eui/es/components/icon/assets/user';
import {icon as EuiIconSearch} from '@elastic/eui/es/components/icon/assets/search';
import {icon as EuiIconArrowRigth} from '@elastic/eui/es/components/icon/assets/arrow_right';
import {icon as EuiIconDot} from '@elastic/eui/es/components/icon/assets/dot';
import {icon as EuiIconEmpty} from '@elastic/eui/es/components/icon/assets/empty';
import {icon as EuiIconCalender} from '@elastic/eui/es/components/icon/assets/calendar';
import {icon as EuiIconSortRigth} from '@elastic/eui/es/components/icon/assets/sortRight';
import {icon as EuiIconSortLeft} from '@elastic/eui/es/components/icon/assets/sortLeft';



// One or more icons are passed in as an object of iconKey (string): IconComponent
appendIconComponentCache({
  arrowDown: EuiIconArrowDown,
  arrowLeft: EuiIconArrowLeft,
  arrowRight: EuiIconArrowRigth,
  lock: EuiIconLock,
  user: EuiIconUser,
  search:EuiIconSearch,
  dot:EuiIconDot,
  empty:EuiIconEmpty,
  calendar:EuiIconCalender,
  sortRight:EuiIconSortRigth,
  sortLeft:EuiIconSortLeft,
});


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