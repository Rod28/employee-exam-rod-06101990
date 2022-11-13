/**
 * La funcion verifica que `value`, contenga caracteres validos.
 * @param value Valor a verificar
 * @returns Bandera que indica si pasa o no la validacion
 */
export const isValidText = (value: string): boolean => {
  if (typeof value !== 'string') {
    return false;
  }

  if (!value) {
    return true;
  }

  const regex = /^[a-záéíóú]+(\s[a-záéíóú]+)*$/gi;
  return regex.test(value);
};

/**
 * La funcion verifica que `value`, contenga un correo valido.
 * @param value Valor a verificar
 * @returns Bandera que indica si pasa o no la validacion
 */
export const isValidMail = (value: string): boolean => {
  if (typeof value !== 'string') {
    return false;
  }

  if (!value) {
    return true;
  }

  const regex =
    /^[_a-z0-9-]+(.[_a-z0-9-]+)@[a-z0-9]+(.[a-z0-9]+)(.[a-z]{2,4})$/gi;
  return regex.test(value);
};

/**
 * La funcion verifica que `value`, contenga un numero telefonico con estructura valida.
 * @param value Valor a verificar
 * @returns Bandera que indica si pasa o no la validacion
 */
export const isValidPhone = (value: string): boolean => {
  if (typeof value !== 'string') {
    return false;
  }

  if (!value) {
    return true;
  }

  const regex = /^\d{10}$/g;
  return regex.test(value);
};

/**
 * La funcion verifica que `value`, contenga un string de solo numeros.
 * @param value Valor a verificar
 * @returns Bandera que indica si pasa o no la validacion
 */
export const isValidOnlyNumbers = (value: string): boolean => {
  if (typeof value !== 'string') {
    return false;
  }

  if (!value) {
    return true;
  }

  const regex = /^\d+$/;
  return regex.test(value);
};

/**
 * La funcion verifica que `value`, sea igual o menor a `length`.
 * @param value Valor a verificar
 * @param length Valor que limita la longitud de value
 * @returns Bandera que indica si pasa o no la validacion
 */
export const isValidMaxLength = (value: string, length: number): boolean => {
  if (typeof value !== 'string' || typeof length !== 'number' || !length) {
    return false;
  }

  if (!value) {
    return true;
  }

  return value.length <= length;
};
