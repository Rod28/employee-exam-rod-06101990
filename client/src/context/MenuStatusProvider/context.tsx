import { createContext, useContext } from 'react';
// Types
import { StateTypes, ActionTypes, ContextType } from './types';

export const initialState: StateTypes = {
  menuState: false
};

const actions: ActionTypes = {
  setMenuState: () => {
    /* */
  }
};

export const context = createContext<ContextType>({
  state: initialState,
  actions
});

export const useMenuStatus = () => useContext(context);
