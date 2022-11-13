// Types
import { PATHS_TYPE } from '../../../routes';

/**
 * La funcion determina si de acuerto al 'path', debe devolver true o false.
 * @param path Ruta actual
 * @param restrict Arreglo de rutas restringidas
 * @param allow Arreglo de rutas renderizar
 * @returns Bandera que indica si se permite el render o no.
 */
export const isAllowed = (
  path: PATHS_TYPE,
  restrict: Array<PATHS_TYPE>,
  allow: Array<PATHS_TYPE>
): boolean => {
  // Al no existir path, regresa false
  if (!path) {
    return false;
  }

  // Si restrict no contiene el path, regresa true
  if (restrict?.length) {
    return !restrict.includes(path);
  }

  // Si allow contiene el path, regresa true
  if (allow?.length) {
    return allow.includes(path);
  }

  return false;
};
