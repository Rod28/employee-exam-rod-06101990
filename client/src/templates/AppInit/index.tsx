import { useRef, useCallback, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
// Constants
import { APP_CONFIG } from '../../constants/appConfig';
// Custom client
import AxiosClient from '../../api/AxiosClient';
// Types
import { AppInitProps } from './types';

const AppInit = ({ children }: AppInitProps) => {
  // Refs
  const timeoutRef = useRef<any>(null);

  /**
   * Funcion para inicializar el cliente de axios.
   */
  const handleInitClient = useCallback((): void => {
    AxiosClient.init(APP_CONFIG.API_URL, {
      timeout: APP_CONFIG.TIMEOUT
    });
  }, []);

  /**
   * Funcion que se encarga de limpiar el timer almacenado en el ref.
   */
  const clearTimer = useCallback(
    (): void => clearTimeout(timeoutRef.current),
    []
  );

  /**
   * Funcion que se llama al cargar el componente App para inicializar
   * el cliente de axios.
   */
  useEffect(() => {
    handleInitClient();
  }, [handleInitClient]);

  /**
   * Una vez al montar la aplicacion o refrescar la pagina, la funcion hace un desplazamiento
   * a la parte superior de la pagina.
   */
  useEffect(() => {
    // Agrega un delay antes de hacer el desplazamiento del scroll
    timeoutRef.current = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 200);

    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return <BrowserRouter>{children}</BrowserRouter>;
};

export default AppInit;
