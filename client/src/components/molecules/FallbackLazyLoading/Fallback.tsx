import { useMemo } from 'react';
// Components
import Spinner from '../../atoms/Spinner';
// Types
import { FallbackProps } from './types';
// Styles
import './style.scss';

/**
 * El componente renderiza un componente de carga
 */
const Fallback = ({ withFallback, isFull }: FallbackProps) => {
  // Dinamyc styles
  const fullStyle = useMemo(() => (isFull ? 'fallback--full' : ''), [isFull]);

  if (!withFallback) {
    return null;
  }

  return (
    <div className={`fallback ${fullStyle}`}>
      <Spinner isLoading color="primary" />
    </div>
  );
};

export default Fallback;
