import { SET_LOADING, StateTypes, ActionsTypes } from './types';

export default function loadingReducers(
  state: StateTypes,
  actions: ActionsTypes
): StateTypes {
  const { type, payload } = actions;

  if (type === SET_LOADING) {
    return { ...state, isLoading: payload };
  }

  return state;
}
