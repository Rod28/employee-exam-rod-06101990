import { useReducer, useCallback } from 'react';
// Context
import { context, initialState } from './context';
// Reducers
import loadingReducers from './reducers';
// Types
import { ProviderProps, SET_LOADING } from './types';

const Loading = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(loadingReducers, initialState);

  /* ------------- ACTIONS ------------- */

  /**
   * Funcion que se encarga de actualizar el valor del loader global.
   * @param v Valor al que va a ser actualizado el loader global
   */
  const setLoading = useCallback((v: boolean): void => {
    dispatch({
      type: SET_LOADING,
      payload: v
    });
  }, []);

  const value = {
    state,
    actions: {
      setLoading
    }
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export default Loading;
