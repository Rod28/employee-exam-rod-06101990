import { ReactNode } from 'react';

export const SET_AUTH = 'SET_AUTH';

export interface ProviderProps {
  /** Componentes hijo */
  children: ReactNode;
}

// State
export interface StateTypes {
  /** Bandera que indica si el usuario hizo o no login */
  hasAuth: boolean;
}

// Actions
export interface ActionTypes {
  /** Funcion que modifica el estado del login */
  setHasAuth(val: boolean): void;
}

// Actions
export interface SetHasAuth {
  type: 'SET_AUTH';
  payload: boolean;
}

// All actions types
export type ActionsTypes = SetHasAuth;

// Context
export interface ContextType {
  state: StateTypes;
  actions: ActionTypes;
}
