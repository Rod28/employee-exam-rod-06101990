import { ReactNode } from 'react';
// Types
import { ModalNotificationTypes } from '../../components/atoms/Modal/types';
import { MessageTitleTypes } from '../../components/atoms/MessageI18n/type';

export const SET_OPEN_MODAL = 'SET_OPEN_MODAL';
export const SET_CLOSE_MODAL = 'SET_CLOSE_MODAL';

export interface ProviderProps {
  /** Componentes hijo */
  children: ReactNode;
}

// State
export interface StateTypes {
  /** Bandera que indica si se muestra la modal o no */
  isOpen?: boolean;
  /** Tipo de modal a renderizar */
  type?: ModalNotificationTypes;
  /** Titulo de la modal */
  title: MessageTitleTypes;
  /** Mensaje en el cuerpo de la modal */
  message: MessageTitleTypes;
  /** Texto del boton de la modal */
  textButton?: MessageTitleTypes;
}

// Actions
export interface ActionTypes {
  /** Funcion que abre y actualizar el estado actual de la modal */
  openModalGlobal(val: StateTypes): void;
  /** Funcion que cierra y volver al estado inicial de la modal */
  closeModalGlobal(): void;
}

// Actions
export interface OpenModalGlobal {
  type: 'SET_OPEN_MODAL';
  payload: StateTypes;
}

export interface CloseModalGlobal {
  type: 'SET_CLOSE_MODAL';
}

// All actions types
export type ActionsTypes = OpenModalGlobal | CloseModalGlobal;

// Context
export interface ContextType {
  state: StateTypes;
  actions: ActionTypes;
}
