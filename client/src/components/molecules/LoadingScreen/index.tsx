// Components
import Spinner from '../../atoms/Spinner';
// Types
import { LoadingScreenProps } from './types';
// Styles
import './style.scss';

/**
 * El componente renderiza una pantalla completa de carga
 */
const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="loading-screen">
      <Spinner isLoading={isLoading} />
    </div>
  );
};

export default LoadingScreen;
