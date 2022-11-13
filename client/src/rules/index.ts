// Validations
import { isValidText, isValidMail, isValidPhone } from '../helpers/validations';

/**
 * La funcion regresa un objeto que indica que el campo es obligatorio.
 */
export const Rule_Required = {
  required: { value: true, message: 'rules.required' }
};

/**
 * La funcion regresa un texto de error, en caso de que `value` no contenga
 * caracteres validos.
 */
export const Rule_OnlyText = {
  validate: {
    formatText: (value: string): string | undefined => {
      if (!isValidText(value)) {
        return 'rules.invalidText';
      }
    }
  }
};

/**
 * La funcion regresa un texto de error, en caso de que `value` no contenga
 * elcaracteres validos o la longitus esperada.
 */
export const Rule_NewEmployee = {
  minLength: { value: 3, message: 'rules.invalidMinLenght' },
  validate: {
    formatText: (value: string): string | undefined => {
      if (!isValidText(value) || value.includes(' ')) {
        return 'rules.invalidText';
      }
    }
  }
};

/**
 * La funcion regresa un texto de error, en caso de que `value` no sea
 * un correo valido.
 */
export const Rule_Mail = {
  validate: {
    formatMail: (value: string): string | undefined => {
      if (!isValidMail(value)) {
        return 'rules.invalidMail';
      }
    }
  }
};

/**
 * La funcion regresa un texto de error, en caso de que `value` no sea
 * un numero telefonico valido.
 */
export const Rule_Phone = {
  validate: {
    formatPhone: (value: string): string | undefined => {
      if (!isValidPhone(value)) {
        return 'rules.invalidPhone';
      }
    }
  }
};
