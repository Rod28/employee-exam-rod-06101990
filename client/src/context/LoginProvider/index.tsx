import { useReducer, useCallback } from 'react';
import LocalStorage from 'local-storage-to-object';
// Context
import { context, initialState } from './context';
// Reducers
import loginReducers from './reducers';
// Types
import { ProviderProps, SET_AUTH } from './types';

const Login = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(loginReducers, initialState);

  /* ------------- ACTIONS ------------- */

  /**
   * Funcion que se encarga de cambiar el estado del login.
   * @param v Valor al que va a ser actualizado el estado del login
   */
  const setHasAuth = useCallback((v: boolean): void => {
    // Persistimos la sesion en local storage para no perderla en caso de cargar.
    LocalStorage.setItem('Login', { auth: v });

    dispatch({
      type: SET_AUTH,
      payload: v
    });
  }, []);

  const value = {
    state,
    actions: {
      setHasAuth
    }
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export default Login;
