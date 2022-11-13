import { createContext, useContext } from 'react';
// Types
import { StateTypes, ActionTypes, ContextType } from './types';

export const initialState: StateTypes = {
  type: 'error',
  isOpen: false,
  title: '- - -',
  message: '- - -',
  textButton: { value: 'buttons.understood' }
};

const actions: ActionTypes = {
  openModalGlobal: () => {
    /* */
  },
  closeModalGlobal: () => {
    /* */
  }
};

export const context = createContext<ContextType>({
  state: initialState,
  actions
});

export const useModal = () => useContext(context);
