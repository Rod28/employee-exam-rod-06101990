// Helpers
import { isValidOnlyNumbers } from './validations';

/**
 * La funcion pone a dormir el componente el mismo tiempo que lo indica el timer,
 * una vez transcurrido este tiempo, el flujo del bloque donde se mando a llamar esta
 * funcion, continua.
 * @param timer Tiempo en que se pone a dormir el flujo antes de continuar con el.
 * @returns Promesa vacia que se resuelve al terminar el timer.
 */
export const sleep = async (timer: number): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (typeof timer !== 'number') {
      reject('Error: >> timer is not a number');
    }
    setTimeout(resolve, timer);
  });
};

/**
 * Funcion que crea un formato de telefono, dependiendo del inicio de su valor.
 * @param value Valor del telefono
 * @returns Formato especifico dependiendo del inicio del telefono
 */
export const createFormatPhone = (value: string): string | undefined => {
  if (!value || !isValidOnlyNumbers(value)) {
    return undefined;
  }

  if (
    // CDMX
    value.startsWith('55') ||
    // Monterrey
    value.startsWith('81') ||
    // Guadalajara
    value.startsWith('33')
  ) {
    return '## #### ####';
  }

  return '### ### ####';
};
