// Custom client
import AxiosClient from './AxiosClient';
// Constants
import { APP_CONFIG } from '../constants/appConfig';

/**
 * Funcion que se encarga de obtener una lista de empleados
 */
export const getEmployees = async (): Promise<any> => {
  const numberResults = Number(APP_CONFIG.NUMBER_RESULTS || 0);
  const client = AxiosClient.getClient();
  return client.get(`/employees/list-employees/?results=${numberResults}`);
};
