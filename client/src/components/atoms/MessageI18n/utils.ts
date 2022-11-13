import { withTranslation } from 'react-i18next';
import isString from 'lodash/isString';
// Types
import { MessageTitleTypes } from './type';

/**
 * Crea la configuracion de las opciones de i18next
 * @param message Mensaje de tipo string o i18next que va a mostrar el componente
 * @returns Configuracion de las opciones de i18next
 */
export const getTranslationsConfig = (message: MessageTitleTypes) => {
  return !isString(message)
    ? {
        ...message?.keys,
        defaultValue:
          Array.isArray(message.value) && message.value.length > 1
            ? [...message.value].pop()
            : '¡Texto no encontrado en i18next!'
      }
    : {};
};

/**
 * Funcion que obtiene el texto dentro de los archivos json de i18next.
 * Si el texto no se encuentra, regresa un texto por defecto.
 * @param message Mensaje de tipo string o i18next que va a mostrar el componente
 * @param t Funcion de useTranslation para obtener el text de i18next
 * @param beforeTitle Texto antes del prop title
 * @param afterTitle Texto despues del prop title
 * @returns Configuracion de las opciones de i18next
 */
export const getMessageTranslation = (
  message: MessageTitleTypes,
  t: typeof withTranslation,
  beforeTitle = '',
  afterTitle = ''
): string => {
  if (isString(message)) {
    return beforeTitle + message + afterTitle;
  }

  const value = Array.isArray(message.value) ? message.value[0] : message.value;
  const messageTranslation = t(value, getTranslationsConfig(message));

  return beforeTitle + messageTranslation + afterTitle;
};
