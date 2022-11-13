// Types
import {
  SET_OPEN_MODAL,
  SET_CLOSE_MODAL,
  StateTypes,
  ActionsTypes
} from './types';

export default function modalReducers(
  state: StateTypes,
  actions: ActionsTypes
): StateTypes {
  const { type } = actions;

  if (type === SET_OPEN_MODAL) {
    const { type, textButton, ...resPayload } = actions.payload;
    const newType = type || 'error';
    const newTextButton = textButton || { value: 'buttons.understood' };
    return {
      ...state,
      ...resPayload,
      isOpen: true,
      type: newType,
      textButton: newTextButton
    };
  }

  if (type === SET_CLOSE_MODAL) {
    return { ...state, isOpen: false };
  }

  return state;
}
