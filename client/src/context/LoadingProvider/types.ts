import { ReactNode } from 'react';

export const SET_LOADING = 'SET_LOADING';

export interface ProviderProps {
  /** Componentes hijo */
  children: ReactNode;
}

// State
export interface StateTypes {
  /** Bandera que indica el estado actual del loader global */
  isLoading: boolean;
}

// Actions
export interface ActionTypes {
  /** Funcion que modifica el estado actual del loader global */
  setLoading(val: boolean): void;
}

// Actions
export interface SetLoadingType {
  type: 'SET_LOADING';
  payload: boolean;
}

// All actions types
export type ActionsTypes = SetLoadingType;

// Context
export interface ContextType {
  state: StateTypes;
  actions: ActionTypes;
}
