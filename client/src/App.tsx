import { lazy, useState } from 'react';
import { Route } from 'react-router-dom';
import ResponsiveDetecter from 'react-responsive-detecter';
// Routes
import { PATHS, PATHS_TYPE } from './routes';
// Contexts
import { useLoading } from './context/LoadingProvider/context';
import { useModal } from './context/ModalProvider/context';
// Screens
import HomeScreen from './screens/HomeScreen';
// Templates
import AppInit from './templates/AppInit';
import RoutesMain from './templates/RoutesMain';
// Components
import FallbackLazyLoading from './components/molecules/FallbackLazyLoading';
import ProtectedRoute from './components/atoms/ProtectedRoute';
import AllowedComponent from './components/atoms/AllowedComponent';
// Styles
import './sass/main.scss';

// Lazy imports
const LoadingScreen = lazy(
  () => import('./components/molecules/LoadingScreen')
);
const Header = lazy(() => import('./components/molecules/Header'));
const ModalNotification = lazy(() => import('./components/atoms/Modal'));
const EmployeesScreen = lazy(() => import('./screens/EmployeesScreen'));
const EmployeeDetails = lazy(() => import('./templates/EmployeeDetails'));
const UploadScreen = lazy(() => import('./screens/UploadScreen'));
const LanguageChanger = lazy(
  () => import('./components/molecules/LanguageChanger')
);

const App = () => {
  // Contexts
  const {
    state: { isLoading }
  } = useLoading();
  const {
    state: { isOpen, type, title, message, textButton },
    actions: { closeModalGlobal }
  } = useModal();

  // State
  const [currentPath, setCurrentPath] = useState<PATHS_TYPE>('/');

  return (
    <AppInit>
      {/* Development stencil */}
      <FallbackLazyLoading>
        <ResponsiveDetecter disable={process.env.NODE_ENV === 'production'} />
      </FallbackLazyLoading>

      {/* Loader global */}
      <FallbackLazyLoading>
        <LoadingScreen isLoading={isLoading} />
      </FallbackLazyLoading>

      {/* Modals success / warning / error */}
      <ModalNotification
        isOpen={isOpen}
        type={type}
        title={title}
        message={message}
        textButton={textButton}
        closeModal={closeModalGlobal}
      />

      {/* Menu */}
      <FallbackLazyLoading>
        <AllowedComponent path={currentPath} restrict={[PATHS.Root]}>
          <Header />
        </AllowedComponent>
      </FallbackLazyLoading>

      {/* Language changer */}
      <FallbackLazyLoading>
        <LanguageChanger />
      </FallbackLazyLoading>

      {/* Pages */}
      <RoutesMain>
        <Route
          path={PATHS.Root}
          element={
            <ProtectedRoute path={PATHS.Root} onCurrentPath={setCurrentPath}>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path={PATHS.Employees}
          element={
            <FallbackLazyLoading withFallback isFull>
              <ProtectedRoute
                path={PATHS.Employees}
                onCurrentPath={setCurrentPath}
              >
                <EmployeesScreen />
              </ProtectedRoute>
            </FallbackLazyLoading>
          }
        >
          <Route
            path={PATHS.EmployeesID}
            element={
              <FallbackLazyLoading withFallback isFull>
                <ProtectedRoute
                  path={PATHS.EmployeesID}
                  onCurrentPath={setCurrentPath}
                >
                  <EmployeeDetails />
                </ProtectedRoute>
              </FallbackLazyLoading>
            }
          />
        </Route>
        <Route
          path={PATHS.Upload}
          element={
            <FallbackLazyLoading withFallback isFull>
              <ProtectedRoute
                path={PATHS.Upload}
                onCurrentPath={setCurrentPath}
              >
                <UploadScreen />
              </ProtectedRoute>
            </FallbackLazyLoading>
          }
        />
        <Route
          path={PATHS.NotFound}
          element={
            <ProtectedRoute
              path={PATHS.NotFound}
              onCurrentPath={setCurrentPath}
            />
          }
        />
      </RoutesMain>
    </AppInit>
  );
};

export default App;
