import { Suspense } from 'react';
// Components
import Fallback from './Fallback';
// Types
import { FallbackLazyLoadingProps } from './types';

/**
 * El componente permite cargar otros componentes de forma asincrona
 */
const FallbackLazyLoading = ({
  children,
  withFallback,
  isFull
}: FallbackLazyLoadingProps) => {
  return (
    <Suspense
      fallback={<Fallback withFallback={withFallback} isFull={isFull} />}
    >
      {children}
    </Suspense>
  );
};

FallbackLazyLoading.defaultProps = {
  withFallback: false,
  isFull: false
};

export default FallbackLazyLoading;
