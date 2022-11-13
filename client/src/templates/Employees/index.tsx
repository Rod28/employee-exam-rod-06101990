import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import moment from 'moment';
// Routes
import { PATHS } from '../../routes';
// Constants
import { APP_CONFIG } from '../../constants/appConfig';
import { FAILED_CREATE_EMPLOYEE } from '../../constants/employees';
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
import { getEmployees } from '../../api/employees';

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
  const [employees, setEmployees] = useState<Array<any>>([]);
  const [findEmploy, setFindEmploy] = useState('');
  const [page, setPages] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [paginationEmployees, setPaginationEmployees] = useState<Array<any>>(
    []
  );

  /**
   * Funcion que hace una peticion al API para obtener un listado
   * de empleados/
   */
  const doFetchEmployees = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);

      const response = await getEmployees();
      const items = response?.results || [];
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
        const name = `${emp?.name?.first || ''} ${emp?.name?.last || ''}`;
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
      const name = (find?.name?.first || '').toLowerCase();
      const lastname = (find?.name?.last || '').toLowerCase();
      const salt = find?.login?.salt || '';
      const dynamicUrl = `${PATHS.Employees}/${name}-${lastname}-${salt}`;

      // Navega a una ruta dinamica por busqueda de usuario
      navigate(dynamicUrl, { state: { isDynamicPath: true, data: find } });
    },
    [employees, navigate, openModalGlobal]
  );

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

        // Simula peticion al API
        await sleep(2000);

        // Simula un error al intentar crear un usuario
        if (
          values.name === FAILED_CREATE_EMPLOYEE.Name &&
          values.lastName === FAILED_CREATE_EMPLOYEE.LastName
        ) {
          // Error sintetico al crear el usuario
          throw new Error();
        }

        const birthday = moment(values.dateBirth).format('YYYY/MM/DD');
        const body = {
          name: values.name,
          last_name: values.lastName,
          birthday
        };
        console.log('Datos que se mandarian al API: >>', body);

        // Simulasmos que se vuelven a pedir los datos para ver el nuevo registro.
        const newData = [
          {
            name: { first: values.name, last: values.lastName },
            picture: {
              large:
                'https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg?w=2000',
              medium:
                'https://img.freepik.com/vector-premium/perfil-avatar-hombre-icono-redondo_24640-14044.jpg?w=2000'
            },
            dob: { date: birthday }
          },
          ...employees
        ];
        const firtsEmployees = createPaginationEmployees(
          newData,
          1,
          Number(APP_CONFIG.ITEMS_PER_PAGE || 0)
        );
        setPages(1);
        setPaginationEmployees(firtsEmployees);
        setEmployees(newData);
        setTotalPages(
          Math.ceil(newData.length / Number(APP_CONFIG.ITEMS_PER_PAGE || 0))
        );

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
    [employees, setLoading, openModalGlobal]
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
            <div className="rounded-lg overflow-hidden bg-gray-lighter">
              {paginationEmployees.map((employ) => {
                return (
                  <button
                    key={employ?.login?.uuid || `{index}-id`}
                    className="flex flex-col sm:flex-row justify-start p-4 border-b border-gray-light w-full bg-gray-lighter hover:bg-zinc-400 duration-300 transition-colors"
                    onClick={() =>
                      handleSubmit({
                        find: `${employ?.name?.first || ''} ${
                          employ?.name?.last || '- - -'
                        }`
                      })
                    }
                  >
                    <div className="flex sm:flex-col justify-between sm:w-32 sm:mr-12">
                      <img
                        src={employ?.picture?.medium || ''}
                        alt={employ?.name?.first || 'Avatar'}
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
                          title={`${employ?.name?.first || ''} ${
                            employ?.name?.last || '- - -'
                          }`}
                          size="small"
                        />
                      </div>
                    </div>

                    {/* Data */}
                    <div className="self-stretch flex flex-col xs:flex-row sm:flex-col items-start xs:mb-4 sm:mb-0 justify-between sm:w-1/3 md:w-5/12">
                      <div className="px-3 mb-4 xs:mb-0 text-left w-1/2 sm:w-auto">
                        <Typography
                          title={{ value: 'screens.employees.mail' }}
                          weight="bold"
                          className="uppercase leading-4"
                        />
                        <Typography
                          title={employ?.email || '- - -'}
                          size="small"
                        />
                      </div>

                      <div className="px-3 mb-4 xs:mb-0 text-left w-1/2 sm:w-auto">
                        <Typography
                          title={{ value: 'screens.employees.cell' }}
                          weight="bold"
                          className="uppercase leading-4"
                        />
                        <Typography
                          title={employ?.phone || '- - -'}
                          size="small"
                        />
                      </div>
                    </div>

                    <div className="self-stretch flex flex-col xs:flex-row sm:flex-col items-start xs:mb-4 sm:mb-0 justify-between sm:w-1/3 md:w-5/12">
                      <div className="px-3 mb-4 xs:mb-0 text-left w-1/2 sm:w-auto">
                        <Typography
                          title={{ value: 'screens.employees.city' }}
                          weight="bold"
                          className="uppercase leading-4"
                        />
                        <Typography
                          title={employ?.location?.city || '- - -'}
                          size="small"
                        />
                      </div>

                      <div className="px-3 text-left w-1/2 sm:w-auto">
                        <Typography
                          title={{ value: 'screens.employees.dateBirth' }}
                          weight="bold"
                          className="uppercase leading-4"
                        />
                        <Typography
                          title={
                            moment(employ?.dob?.date).format('DD-MM-yyyy') ||
                            '- - -'
                          }
                          size="small"
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
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
