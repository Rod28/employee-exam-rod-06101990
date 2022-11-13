import { ReactElement } from 'react';
// Types
import { Colors } from '../../../interfaces/colors';
import { TemplatesInput } from '../../../interfaces/templates';
import { TypographyTitleTypes } from '../Typography/types';

export type InputTypes = 'text' | 'password' | 'date';
export type NumericTypes = 'tel' | 'number';
export type TextareaTypes = 'textarea';
export type IconPassTypes = 'show' | 'hide';

export interface CustomError {
  /** Mensaje de error personalizado */
  message: TypographyTitleTypes;
  /** Bandera que indica si se debe mostrar o no el mensaje de error personalizado */
  validation: boolean;
}

export interface BaseProps {
  /** Nombre del input */
  name: string;
  /** Titulo del elemento label */
  title?: TypographyTitleTypes;
  /** Estilos del elemento input */
  template: TemplatesInput;
  /** Estilos inyectados del componente */
  className?: string;
  /** Nombre del paquete del icono a renderizar */
  iconName?: string;
  /** Color del input e icono */
  color: Colors;
  /** Error personalizado que se controla desde el padre */
  customError: CustomError;
  /** Bandera que indica si se debe mostrar o no, el mensaje de error */
  hideError?: boolean;
  /** Bandera que indica si el elemento label debe animarse o no */
  stopLabelAnimation: boolean;
  /** Bandera que indica si el campo es obligatorio o no */
  isRequired: boolean;
  /** Reglas del componente */
  rules?: Record<string, any>;
  /** Bandera que indica si el input esta deshabilitado o no */
  disabled: boolean;
}

/* ---------------  B A S E   W R A P P E R   I N P U T  --------------- */

export interface RenderInputProps {
  /** Nombre del input */
  nameInput: string;
  /** Valor del input */
  valueInput: string;
  /** Bandera que indica si el input esta deshabilitado o no */
  disabledInput: boolean;
  /** Estilos del input */
  classesInput: string;
  /** Funcion onChange que cambia el valor del input */
  onChangeInput(v: string): void;
}

export interface BaseWrapperInputProps extends BaseProps {
  /** Tipo de input a renderizar */
  type: InputTypes | NumericTypes | TextareaTypes;
  /** Valor por defecto del input */
  defaultValue?: string;
  /** Funcion que va a renderizar el componente Input */
  renderInput(v: RenderInputProps): ReactElement;
  /** Funcion que va a renderizar el icono para el Input password */
  renderPasswordIcon?(): ReactElement;
}

/* -------------------  I N P U T S  F E A T U R E S  ------------------- */

export interface InputFeatures extends BaseProps {
  /** Bandera que indica si debe haber un auto foco en el input al inicio del render */
  autoFocus?: boolean;
  /** Longitud maxima de caracteres */
  maxLength: number;
  /** Callback que manda al padre el nombre y valor del input */
  onValue?(name: string, value: string): void;
}

/* ---------------------------  I N P U T S  --------------------------- */
export interface InputProps extends InputFeatures {
  /** Tipo de input a renderizar */
  type: InputTypes;
  /** Valor por defecto del input */
  defaultValue?: string;
  /** Bandera que evita que se copy en el input */
  isPreventCopy?: boolean;
  /** Bandera que evita que se pegue en el input */
  isPreventPaste?: boolean;
}

export interface NumericProps extends InputFeatures {
  /** Tipo de input a renderizar */
  type: NumericTypes;
  /** Valor por defecto del input */
  defaultValue?: string;
  /** Bandera que indica si se deben permitir o no numeros negativos */
  allowNegative: boolean;
  /** Bandera que indica si se debe permitir el formato o no */
  allowEmptyFormatting: boolean;
  /** Formato para separar el valor del input */
  format?: string;
}

export interface TextareaProps extends InputFeatures {
  /** Numero de filas para mostrar */
  rows: number;
}

/* -------------------  D Y N A M I C   S T Y L E S  ------------------- */
export interface DynamicStylesProps {
  /** Tipo de input a renderizar */
  type: InputTypes | NumericTypes | TextareaTypes;
  /** Nombre del input */
  name: string;
  /** Estilos del elemento input */
  template: TemplatesInput;
  /** Nombre del paquete del icono a renderizar */
  iconName?: string;
  /** Color del input e icono */
  color: Colors;
  /** Bandera que indica si el elemento label debe animarse o no */
  stopLabelAnimation: boolean;
  /** Bandera que indica si el input esta deshabilitado o no */
  disabled: boolean;
  /** Obeto de errores manejado por react-hook-form */
  errors: any;
  /** Error personalizado que se controla desde el padre */
  customError: CustomError;
  /** Bandera que indica si hay que mostar un espacio inferior en el componente */
  spacingError: boolean;
  /** Valor actual del input */
  value: string;
}

export interface InputDynamicStylesReturn {
  /** Classes para el contenedor del input */
  classesBody: string;
  /** Classes para el espacio superior del contenedor del input */
  classInputSpacing: string;
  /** Estilos que agregan un espacio inferior en el componente si puede haber un error */
  classesWithError: string;
  /** Clases para el elemento input */
  classesInput: string;
  /** Clases para el elemento label */
  classesLabel: string;
  /** Clases para el icono con template como baseline */
  classesIcon: string;
  /** Clases para el icono en estado disabled */
  classesIconDisabled: string;
  /** Clases para el color del icono en estado disabled */
  colorIconDisabled: Colors;
  /** Clases para los mensajes de errror con template como baseline */
  classesErrorMessage: string;
}
