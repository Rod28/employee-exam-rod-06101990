import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
// Routes
import { PATHS } from '../../routes';
// Assets
import Avatar from '../../assets/images/avatar.webp';
// Components
import Typography from '../../components/atoms/Typography';

const EmployeeDetails = () => {
  // Navigation
  const navigate = useNavigate();
  // Location
  const { state } = useLocation();

  /**
   * Si el usuario intenta acceder a una ruta que no existe desde la url,
   * sera redirigido a '/employees'.
   */
  useEffect(() => {
    if (!state?.isDynamicPath) {
      navigate(PATHS.Employees, { replace: true });
    }
  }, [navigate, state?.isDynamicPath]);

  return (
    <div className="mt-8 mb-24">
      <Typography
        title={`${state?.data?.name || '- - -'} ${
          state?.data?.last_name || '- - -'
        }`}
        size="large"
        weight="bold"
        className="text-center leading-10 mb-3"
        color="secondary"
      />

      <div className="flex flex-col items-center">
        <img
          src={Avatar}
          alt={state?.data?.name || 'Avatar'}
          width={128}
          height={128}
          className="rounded-full mr-6 sm:mr-0 mb-6 sm:mb-0"
        />

        {/* Container */}
        <div className="sm:flex sm:justify-between w-11/12 md:w-4/5 max-w-screen-md mx-auto mt-8">
          {/* Card 1 */}
          <div className="sm:w-1/2 mx-4">
            {/* Title */}
            <Typography
              title={{ value: 'screens.employees.personalData' }}
              size="small"
              weight="bold"
              color="primary"
              className="leading-4 ml-4 mb-2"
            />

            <div className="p-4 mb-5 sm:mb-0 bg-sky-100 rounded-lg">
              <div className=" mb-3">
                <Typography
                  title={{ value: 'screens.employees.gender' }}
                  weight="bold"
                  className="leading-4"
                />
                <Typography
                  title={state?.data?.gender || '- - -'}
                  size="small"
                />
              </div>

              <div className=" mb-3">
                <Typography
                  title={{ value: 'screens.employees.mail' }}
                  weight="bold"
                  className="leading-4"
                />
                <Typography
                  title={state?.data?.email || '- - -'}
                  size="small"
                />
              </div>

              <div className=" mb-3">
                <Typography
                  title={{ value: 'screens.employees.cell' }}
                  weight="bold"
                  className="leading-4"
                />
                <Typography
                  title={state?.data?.phone || '- - -'}
                  size="small"
                />
              </div>

              <div className=" mb-3">
                <Typography
                  title={{ value: 'screens.employees.dateBirth' }}
                  weight="bold"
                  className="leading-4"
                />
                <Typography
                  title={moment(state?.data?.birthday || '- - -').format(
                    'YYYY/MM/DD'
                  )}
                  size="small"
                />
              </div>

              <div>
                <Typography
                  title={{ value: 'screens.employees.age' }}
                  weight="bold"
                  className="leading-4"
                />
                <Typography
                  title={{
                    value: 'screens.employees.ageData',
                    keys: {
                      years: `${state?.data?.dob?.age || '- - -'}`
                    }
                  }}
                  size="small"
                />
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="sm:w-1/2 mx-4">
            {/* Title */}
            <Typography
              title={{ value: 'screens.employees.currentLocation' }}
              size="small"
              weight="bold"
              color="primary"
              className="leading-4 ml-4 mb-2"
            />

            <div className="p-4 mb-5 sm:mb-0 bg-sky-100 rounded-lg">
              <div className=" mb-3">
                <Typography
                  title={{ value: 'screens.employees.city' }}
                  weight="bold"
                  className="leading-4"
                />
                <Typography
                  title={state?.data?.location?.city || '- - -'}
                  size="small"
                />
              </div>

              <div className=" mb-3">
                <Typography
                  title={{ value: 'screens.employees.street' }}
                  weight="bold"
                  className="leading-4"
                />
                <Typography
                  title={`${state?.data?.location?.street?.name || '- - -'} ${
                    state?.data?.location?.street?.number || '- - -'
                  }`}
                  size="small"
                />
              </div>

              <div className=" mb-3">
                <Typography
                  title={{ value: 'screens.employees.state' }}
                  weight="bold"
                  className="leading-4"
                />
                <Typography
                  title={state?.data?.location?.state || '- - -'}
                  size="small"
                />
              </div>

              <div className=" mb-3">
                <Typography
                  title={{ value: 'screens.employees.country' }}
                  weight="bold"
                  className="leading-4"
                />
                <Typography
                  title={state?.data?.location?.country || '- - -'}
                  size="small"
                />
              </div>

              <div>
                <Typography
                  title={{ value: 'screens.employees.postcode' }}
                  weight="bold"
                  className="leading-4"
                />
                <Typography
                  title={`${state?.data?.location?.postcode || '- - -'}`}
                  size="small"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="w-11/12 md:w-4/5 max-w-screen-md sm:mt-8 mb-8 mx-auto">
          {/* Title */}
          <Typography
            title={{ value: 'screens.employees.workData' }}
            size="small"
            weight="bold"
            color="primary"
            className="leading-4 ml-4 mb-2"
          />

          <div className="p-4 mx-4 rounded-lg bg-sky-100">
            <div className=" mb-3">
              <Typography
                title={{ value: 'screens.employees.antiquity' }}
                weight="bold"
                className="leading-4"
              />
              <Typography
                title={{
                  value: 'screens.employees.ageData',
                  keys: {
                    years: `${state?.data?.registered?.age || '- - -'}`
                  }
                }}
                size="small"
              />
            </div>

            <div>
              <Typography
                title={{ value: 'screens.employees.dateAdmission' }}
                weight="bold"
                className="leading-4"
              />
              <Typography title="- - -" size="small" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
