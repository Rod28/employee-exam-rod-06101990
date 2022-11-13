import { useReducer, useCallback } from 'react';
// Context
import { context, initialState } from './context';
// Reducers
import menuStateReducers from './reducers';
// Types
import { ProviderProps, SET_MENU_STATE } from './types';

const MenuStatus = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(menuStateReducers, initialState);

  /* ------------- ACTIONS ------------- */

  /**
   * Funcion que se encarga de actualizar el valor de menuState.
   * @param v Valor al que va a ser actualizado menuState
   */
  const setMenuState = useCallback((v: boolean): void => {
    dispatch({
      type: SET_MENU_STATE,
      payload: v
    });
  }, []);

  const value = {
    state,
    actions: {
      setMenuState
    }
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export default MenuStatus;
