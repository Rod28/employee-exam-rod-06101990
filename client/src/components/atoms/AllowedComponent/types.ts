// Types
import { PATHS_TYPE } from '../../../routes';

export interface AllowedComponentProps {
  /** Ruta actual */
  path: PATHS_TYPE;
  /** Arreglo de rutas restringidas */
  restrict: Array<PATHS_TYPE>;
  /** Arreglo de rutas permitidas */
  allow: Array<PATHS_TYPE>;
  /** Componente hijo a renderizar */
  children: any;
}
