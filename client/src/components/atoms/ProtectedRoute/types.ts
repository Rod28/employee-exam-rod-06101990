// Routes
import { PATHS_TYPE } from '../../../routes';

export interface ProtectedRouteProps {
  /** Ruta a la que se va a navegar */
  path: PATHS_TYPE;
  /** Componente hijo a renderizar */
  children?: any;
  /** Funcion callback que devuelve al padre la ruta actual */
  onCurrentPath(path: PATHS_TYPE): void;
}
