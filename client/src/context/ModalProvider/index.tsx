import { useReducer, useCallback } from 'react';
// Context
import { context, initialState } from './context';
// Reducers
import modalReducers from './reducers';
// Types
import {
  ProviderProps,
  StateTypes,
  SET_OPEN_MODAL,
  SET_CLOSE_MODAL
} from './types';

const Modal = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(modalReducers, initialState);

  /* ------------- ACTIONS ------------- */

  /**
   * Funcion que abre y actualizar el estado actual de la modal.
   */
  const openModalGlobal = useCallback((v: StateTypes): void => {
    dispatch({
      type: SET_OPEN_MODAL,
      payload: v
    });
  }, []);

  /**
   * Funcion que cierra y volver al estado inicial de la modal.
   */
  const closeModalGlobal = useCallback((): void => {
    dispatch({
      type: SET_CLOSE_MODAL
    });
  }, []);

  const value = {
    state,
    actions: {
      openModalGlobal,
      closeModalGlobal
    }
  };

  return <context.Provider value={value}>{children}</context.Provider>;
};

export default Modal;
