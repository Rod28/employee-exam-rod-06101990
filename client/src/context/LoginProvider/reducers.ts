import { SET_AUTH, StateTypes, ActionsTypes } from './types';

export default function loginReducers(
  state: StateTypes,
  actions: ActionsTypes
): StateTypes {
  const { type, payload } = actions;

  if (type === SET_AUTH) {
    return { ...state, hasAuth: payload };
  }

  return state;
}
