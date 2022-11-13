import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import moment from 'moment';
// Routes
import { PATHS } from '../../routes';
// Constants
import { APP_CONFIG } from '../../constants/appConfig';
import { FAILED_CREATE_EMPLOYEE } from '../../constants/employees';
// Assets
import Avatar from '../../assets/images/avatar.webp';
// Context
import { useLoading } from '../../context/LoadingProvider/context';
import { useModal } from '../../context/ModalProvider/context';
// Components
import Typography from '../../components/atoms/Typography';
import Button from '../../components/atoms/Buttons/Button';
import Submit from '../../components/atoms/Buttons/Submit';
import Input from '../../components/atoms/Inputs/Input';
import Form from '../../components/atoms/Form';
import AddEmployee from '../../components/molecules/AddEmployee';
// Helpers
import { sleep } from '../../helpers';
// Utils
import { createPaginationEmployees } from './utils';
// API
import { getEmployees, createEmployee } from '../../api/employees';
// Types
import { Employee, CreateEmployee } from '../../interfaces/employees';

const Employees = () => {
  // Navigation
  const navigate = useNavigate();
  // Location
  const { state } = useLocation();

  // Context
  const {
    state: { isLoading },
    actions: { setLoading }
  } = useLoading();
  const {
    actions: { openModalGlobal }
  } = useModal();

  // State
  const [addNewEmployee, setAddNewEmployee] = useState(false);
  const [employees, setEmployees] = useState<Array<Employee>>([]);
  const [findEmploy, setFindEmploy] = useState('');
  const [page, setPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationEmployees, setPaginationEmployees] = useState<
    Array<Employee>
  >([]);

  /**
   * Funcion que hace una peticion al API para obtener un listado
   * de empleados/
   */
  const doFetchEmployees = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await getEmployees();

      // Error sintetico al cargar los usuarios
      if (!response?.success) {
        throw new Error();
      }

      const items = response?.data?.employees || [];
      const firtsEmployees = createPaginationEmployees(
        items,
        1,
        Number(APP_CONFIG.ITEMS_PER_PAGE || 0)
      );
      setPages(1);
      setPaginationEmployees(firtsEmployees);
      setEmployees(items);
      setTotalPages(
        Math.ceil(items.length / Number(APP_CONFIG.ITEMS_PER_PAGE || 0))
      );
    } catch (error: any) {
      // Evita la doble peticion que hace React18 en modo desarrollo.
      if (
        error?.message === "Cannot read properties of undefined (reading 'get')"
      ) {
        return;
      }

      openModalGlobal({
        title: { value: 'modals.getEmployees.title' },
        message: { value: 'modals.getEmployees.message' }
      });
    } finally {
      setLoading(false);
    }
  }, [setLoading, openModalGlobal]);

  /**
   * Funcion que se encarga de agregar un nuevo empleado y refrescar la
   * lista actual para poder verlo.
   * @param data Datos del formulario
   */
  const handleAddNeEmployee = useCallback(
    async (values: Record<string, string>): Promise<void> => {
      try {
        setAddNewEmployee(false);
        setLoading(true);

        // Simula un error al intentar crear un usuario
        if (
          values.name === FAILED_CREATE_EMPLOYEE.Name &&
          values.lastName === FAILED_CREATE_EMPLOYEE.LastName
        ) {
          // Simula peticion al API
          await sleep(2000);

          // Error sintetico al crear el usuario
          throw new Error();
        }

        const birthday = moment(values.dateBirth).format('YYYY/MM/DD');
        const body: CreateEmployee = {
          name: values.name,
          last_name: values.lastName,
          birthday
        };

        // Creamos el usuario
        const response = await createEmployee(body);

        // Error sintetico al crear el usuario
        if (!response?.success) {
          throw new Error();
        }

        // Se vuelven a solicitar los nuevos usuarios
        await doFetchEmployees();

        // Nuevo usuario agregado con exito.
        openModalGlobal({
          type: 'successful',
          title: { value: 'modals.addedEmployee.title' },
          message: { value: 'modals.addedEmployee.message' }
        });
      } catch {
        // No debe existir un error que mostrar ya que es una peticion simulada.

        // Este error es sintetico, y solo hay un caso que lo detona.
        openModalGlobal({
          title: { value: 'modals.addedEmployeeError.title' },
          message: { value: 'modals.addedEmployeeError.message' }
        });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, doFetchEmployees, openModalGlobal]
  );

  /**
   * La funcion almacena en el state, el valor actual del campo 'find'.
   * @param name Nombre del campo
   * @param value Valor del campo
   */
  const handleOnChange = useCallback((name: string, value: string): void => {
    setFindEmploy(value);
  }, []);

  /**
   * Funcionn que regresa a la pagina anterior.
   * @param value Objeto con el valor del formulario
   */
  const handleSubmit = useCallback(
    (value: { find: string }): void => {
      const find = employees.find((emp) => {
        const name = `${emp?.name || ''} ${emp?.last_name || ''}`;
        if (name.toLowerCase().includes(value.find.toLowerCase())) {
          return emp;
        }

        return undefined;
      });

      // Error sintetico, usuario no existente
      if (!find) {
        openModalGlobal({
          title: { value: 'modals.emplyNotFound.title' },
          message: { value: 'modals.emplyNotFound.message' }
        });
        return;
      }

      // Data
      const name = (find?.name || '').toLowerCase();
      const lastname = (find?.last_name || '').toLowerCase();
      const salt = find?.id || '';
      const dynamicUrl = `${PATHS.Employees}/${name}-${lastname}-${salt}`;

      // Navega a una ruta dinamica por busqueda de usuario
      navigate(dynamicUrl, { state: { isDynamicPath: true, data: find } });
    },
    [employees, navigate, openModalGlobal]
  );

  /**
   * Funcionn que regresa a la pagina anterior.
   */
  const handlePrevPage = useCallback((): void => {
    const newEmployees = createPaginationEmployees(
      employees,
      page - 1,
      Number(APP_CONFIG.ITEMS_PER_PAGE || 0)
    );
    setPaginationEmployees(newEmployees);
    setPages((prevVal) => prevVal - 1);
  }, [employees, page]);

  /**
   * Funcionn que avanza a la pagina siguiente.
   */
  const handleNextPage = useCallback((): void => {
    const newEmployees = createPaginationEmployees(
      employees,
      page + 1,
      Number(APP_CONFIG.ITEMS_PER_PAGE || 0)
    );
    setPaginationEmployees(newEmployees);
    setPages((prevVal) => prevVal + 1);
  }, [employees, page]);

  /**
   * Funcionn que abre la modal para agregar un nuevo empleado.
   */
  const handleOpenAddModal = useCallback((): void => {
    setAddNewEmployee(true);
  }, []);

  /**
   * Funcionn que cierra la modal para agregar un nuevo empleado.
   */
  const handleCloseAddModal = useCallback((): void => {
    setAddNewEmployee(false);
  }, []);

  /**
   * Al montar el componente, se obtiene los usuarios
   */
  useEffect(() => {
    doFetchEmployees();
  }, [doFetchEmployees]);

  return (
    <>
      <div className="mt-10 mb-24">
        <Typography
          title={{ value: 'screens.employees.title' }}
          size="big"
          weight="bold"
          className="text-center uppercase leading-10"
          color="primary"
        />

        {/* Employee details */}
        <Outlet />

        {/* Container */}
        <div className="w-11/12 md:w-4/5 max-w-screen-md mx-auto mt-10">
          {!state?.isDynamicPath && (
            <div className="flex justify-center mb-2">
              <Button
                size="small"
                title={{ value: 'buttons.addEmployee' }}
                endIcon="plus"
                disabled={isLoading}
                onClick={handleOpenAddModal}
              />
            </div>
          )}

          {!state?.isDynamicPath && (
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-6">
              <Form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row items-center sm:items-end"
              >
                <Input
                  name="find"
                  defaultValue={findEmploy}
                  template="outline"
                  title={{ value: 'inputs.find' }}
                  onValue={handleOnChange}
                  disabled={isLoading || !employees.length}
                  maxLength={25}
                />
                <Submit
                  size="small"
                  endIcon="search"
                  disabled={!findEmploy}
                  title={{ value: 'buttons.find' }}
                  className="w-64 sm:w-auto sm:ml-5 mt-4 sm:mt-0"
                />
              </Form>

              {/* Pagination */}
              <div className="flex flex-wrap mt-4 sm:mt-0">
                <Typography
                  title={{
                    value: 'screens.employees.pages',
                    keys: { start: `${page}`, end: `${totalPages}` }
                  }}
                  size="small"
                  weight="bold"
                  className="mx-3 my-2"
                />

                <div className="flex just">
                  <Button
                    size="small"
                    startIcon="minus"
                    color="white"
                    disabled={!page || page === 1 || isLoading}
                    onClick={handlePrevPage}
                  />
                  <Button
                    size="small"
                    startIcon="plus"
                    className="ml-3"
                    color="white"
                    disabled={!page || page === totalPages || isLoading}
                    onClick={handleNextPage}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          {!state?.isDynamicPath && (
            <>
              <Typography
                title={{
                  value: 'screens.employees.totalEmployees',
                  keys: { total: `${employees.length}` }
                }}
                weight="bold"
                color="primary"
                className="uppercase leading-4 ml-4 sm:ml-6 mb-2"
              />
              <div className="rounded-lg overflow-hidden bg-gray-lighter">
                {paginationEmployees.map((employ) => {
                  return (
                    <button
                      key={`id-${employ.id}`}
                      className="flex flex-col sm:flex-row items-center justify-start p-4 border-b border-gray-light w-full bg-gray-lighter hover:bg-zinc-400 duration-300 transition-colors"
                      onClick={() =>
                        handleSubmit({
                          find: `${employ?.name || ''} ${
                            employ?.last_name || '- - -'
                          }`
                        })
                      }
                    >
                      <div className="flex sm:flex-col justify-between sm:w-32 sm:mr-12">
                        <img
                          src={Avatar}
                          alt={employ?.name || 'Avatar'}
                          width={72}
                          height={72}
                          className="rounded-full mr-6 sm:mr-0 mb-6 sm:mb-0"
                        />

                        <div className="mt-4 w-full">
                          <Typography
                            title={{ value: 'screens.employees.name' }}
                            weight="bold"
                            className="uppercase leading-4"
                          />
                          <Typography
                            title={`${employ?.name || ''}`}
                            size="small"
                          />
                        </div>
                      </div>

                      {/* Data */}
                      <div className="self-stretch flex flex-col xs:flex-row xs:mb-4 sm:mb-0 sm:items-center sm:justify-center sm:w-1/3 md:w-5/12">
                        <div className="px-3 mb-4 xs:mb-0 text-left">
                          <Typography
                            title={{ value: 'screens.employees.fullName' }}
                            weight="bold"
                            className="uppercase leading-4"
                          />
                          <Typography
                            title={`${employ?.name || ''} ${
                              employ?.last_name || ''
                            }`}
                            size="small"
                          />
                        </div>
                      </div>

                      <div className="self-stretch flex flex-col xs:flex-row xs:mb-4 sm:mb-0 sm:items-center sm:justify-center sm:w-1/3 md:w-5/12">
                        <div className="px-3 mb-4 xs:mb-0 text-left">
                          <Typography
                            title={{ value: 'screens.employees.dateBirth' }}
                            weight="bold"
                            className="uppercase leading-4"
                          />
                          <Typography
                            title={moment(employ?.birthday || '- - -').format(
                              'YYYY/MM/DD'
                            )}
                            size="small"
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal para agregar un nuevo empleado */}
      <AddEmployee
        isOpen={addNewEmployee}
        onCloseModal={handleCloseAddModal}
        onContinue={handleAddNeEmployee}
      />
    </>
  );
};

export default Employees;
