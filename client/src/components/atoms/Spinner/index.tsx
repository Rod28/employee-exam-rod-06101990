// Types
import { SpinnerProps } from './types';
// Styles
import './style.scss';

/**
 * Renderiza uno de los spinner de acuerdo al props 'type'.
 */
const Spinner = ({
  type,
  color,
  colorMiddle,
  colorCenter,
  isSmall,
  isLoading
}: SpinnerProps) => {
  // Styles
  const loaderClass = `loader ${isSmall && 'loader--small'}`;
  const sizeClass = isSmall && `loader__spinner-${type}--small`;
  const spinnerClass = `loader__spinner-${type} ${sizeClass}`;

  // Styles core
  const loaderClass_core = `loader-core ${isSmall && 'loader-core--small'}`;
  const sizeClass_wrapper = isSmall && `loader-core__wrapper--small`;
  const classSpinner_wrapper = `loader-core__wrapper ${sizeClass_wrapper}`;
  const classEqualCore =
    type === 'equalCore' && 'loader-core__spinner-middle__spin--right';

  switch (type) {
    case 'bars': {
      return (
        <div className={loaderClass}>
          {isLoading && <div className={`${spinnerClass} bg-${color}`}></div>}
        </div>
      );
    }
    case 'ring': {
      return (
        <div className={loaderClass}>
          {isLoading && <div className={`${spinnerClass} text-${color}`}></div>}
        </div>
      );
    }
    case 'core':
    case 'equalCore': {
      return (
        <div className={loaderClass_core}>
          {isLoading && (
            <div className={classSpinner_wrapper}>
              <div className={`loader-core__spinner-outer text-${color}`}>
                <div className="loader-core__spinner-outer__spin"></div>
              </div>

              <div
                className={`loader-core__spinner-middle text-${colorMiddle}`}
              >
                <div
                  className={`loader-core__spinner-middle__spin ${classEqualCore}`}
                ></div>
              </div>

              <div
                className={`loader-core__spinner-center text-${colorCenter}`}
              >
                <div className="loader-core__spinner-center__spin"></div>
              </div>
            </div>
          )}
        </div>
      );
    }
    default: {
      return (
        <div className={loaderClass}>
          {isLoading && <div className="flex">Loading...</div>}
        </div>
      );
    }
  }
};

Spinner.defaultProps = {
  type: 'ring',
  color: 'primary',
  colorMiddle: 'primary',
  colorCenter: 'primary'
};

export default Spinner;
