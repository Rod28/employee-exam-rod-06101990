// Custom client
import AxiosClient from './AxiosClient';

// Types
import { CreateEmployee } from '../interfaces/employees';

/**
 * Funcion que se encarga de obtener una lista de empleados
 */
export const getEmployees = async (): Promise<any> => {
  const client = AxiosClient.getClient();
  return client.get('/employees/list-employees');
};

/**
 * Funcion que se encarga de obtener una lista de empleados
 */
export const createEmployee = async (body: CreateEmployee): Promise<any> => {
  const client = AxiosClient.getClient();
  return client.post('/employees/create-employees', body);
};
