import { useMemo } from 'react';
// Utils
import { isAllowed } from './utils';
// Types
import { AllowedComponentProps } from './types';

const AllowedComponent = ({
  path,
  restrict,
  allow,
  children
}: AllowedComponentProps) => {
  // Indica si se debe renderizar el componente o no
  const allowRender = useMemo(
    () => isAllowed(path, restrict, allow),
    [path, restrict, allow]
  );

  return allowRender ? children : null;
};

AllowedComponent.defaultProps = {
  restrict: [],
  allow: []
};

export default AllowedComponent;
