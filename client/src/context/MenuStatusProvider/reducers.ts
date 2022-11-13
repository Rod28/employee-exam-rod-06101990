import { SET_MENU_STATE, StateTypes, ActionsTypes } from './types';

export default function menuStateReducers(
  state: StateTypes,
  actions: ActionsTypes
): StateTypes {
  const { type, payload } = actions;

  if (type === SET_MENU_STATE) {
    return { ...state, menuState: payload };
  }

  return state;
}
