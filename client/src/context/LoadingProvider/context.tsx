import { createContext, useContext } from 'react';
// Types
import { StateTypes, ActionTypes, ContextType } from './types';

export const initialState: StateTypes = {
  isLoading: false
};

const actions: ActionTypes = {
  setLoading: () => {
    /* */
  }
};

export const context = createContext<ContextType>({
  state: initialState,
  actions
});

export const useLoading = () => useContext(context);
