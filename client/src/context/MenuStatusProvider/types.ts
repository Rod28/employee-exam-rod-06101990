import { ReactNode } from 'react';

export const SET_MENU_STATE = 'SET_MENU_STATE';

export interface ProviderProps {
  /** Componentes hijo */
  children: ReactNode;
}

// State
export interface StateTypes {
  /** Bandera que indica el estado actual del menu */
  menuState: boolean;
}

// Actions
export interface ActionTypes {
  /** Funcion que modifica el estado actual del menu */
  setMenuState(val: boolean): void;
}

// Actions
export interface SetMenuStateType {
  type: 'SET_MENU_STATE';
  payload: boolean;
}

// All actions types
export type ActionsTypes = SetMenuStateType;

// Context
export interface ContextType {
  state: StateTypes;
  actions: ActionTypes;
}
