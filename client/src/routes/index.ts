export enum PATHS {
  Root = '/',
  Employees = '/employees',
  EmployeesID = ':id',
  Upload = '/upload',
  NotFound = '*'
}

export enum PATH_NAMES {
  Employees = 'Employees',
  Upload = 'Upload',
  Logout = 'Logout'
}

export type PATHS_TYPE = '/' | '/employees' | ':id' | '/upload' | '*';

export const ROUTES = [
  {
    id: 1,
    path: PATHS.Employees,
    name: PATH_NAMES.Employees
  },
  {
    id: 2,
    path: PATHS.Upload,
    name: PATH_NAMES.Upload
  },
  {
    id: 3,
    path: '-',
    name: PATH_NAMES.Logout
  }
];
