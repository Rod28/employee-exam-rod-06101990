import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
// Routes
import { PATHS } from '../../../routes';
// Contexts
import { useAuth } from '../../../context/LoginProvider/context';
// Types
import { ProtectedRouteProps } from './types';

const ProtectedRoute = ({
  path,
  children,
  onCurrentPath
}: ProtectedRouteProps) => {
  // Contexts
  const {
    state: { hasAuth }
  } = useAuth();

  //
  useEffect(() => {
    onCurrentPath(path);
  }, [path, onCurrentPath]);

  // Si existe una sesion y la ruta no existe es es '/', se redirecciona a '/employees'.
  if (hasAuth && (path === PATHS.Root || path === PATHS.NotFound)) {
    return <Navigate to={PATHS.Employees} replace />;
  }

  // Si no existe una sesion y la ruta es diferente del '/', se redirecciona al '/'.
  if (!hasAuth && path !== PATHS.Root) {
    return <Navigate to={PATHS.Root} replace />;
  }

  // Si no se agrega children, se redirecciona al '/'.
  if (!children) {
    return <Navigate to={PATHS.Root} replace />;
  }

  return children;
};

export default ProtectedRoute;
