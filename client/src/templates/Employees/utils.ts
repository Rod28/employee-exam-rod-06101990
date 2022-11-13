/**
 * Funcion que se encarga de filtrar usuarios, simula una paginacion.
 * @param employees Lista de empleados
 * @param currentPage Pagina actual
 * @param itemsPerPage Numero de elementos por pagina
 * @returns Un nuevo arreglo de usuarios paginaodos
 */
export const createPaginationEmployees = (
  employees: any[],
  currentPage: number,
  itemsPerPage: number
): Array<any> => {
  const emp = [...employees];
  const start = itemsPerPage * (currentPage - 1);
  const end = itemsPerPage * currentPage;
  const result = emp.slice(start, end);

  return result;
};
