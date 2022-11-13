import { createContext, useContext } from 'react';
import LocalStorage from 'local-storage-to-object';
// Types
import { StateTypes, ActionTypes, ContextType } from './types';

export const initialState: StateTypes = {
  hasAuth: LocalStorage.getItem('Login', 'auth', false)
};

const actions: ActionTypes = {
  setHasAuth: () => {
    /* */
  }
};

export const context = createContext<ContextType>({
  state: initialState,
  actions
});

export const useAuth = () => useContext(context);
