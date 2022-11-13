import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
// Types
import {
  CustomError,
  DynamicStylesProps,
  InputDynamicStylesReturn
} from './types';
import { TypographyTitleTypes } from '../Typography/types';

/**
 * La funcion recibe un objeto de errores y el nombre del input, y determina si el input
 * contiene errores o no.
 * @param _errors Obeto de errores manejado por react-hook-form
 * @param _name Nombre del input
 * @returns Bandera que indica si el input contiene errores o no
 */
export const hasErrorInput = (_errors: any, _name: string): boolean => {
  return !isEmpty(_errors) && !isUndefined(_errors[_name]);
};

/**
 * La funcion recibe un objeto de errores y el nombre del input, y si es que existen
 * errores en el input, se obtiene el mensaje del error.
 * @param _errors Obeto de errores manejado por react-hook-form
 * @param _name Nombre del input
 * @param _customError Error personalizado que se controla desde el padre
 * @returns Mensaje de error
 */
export const getErrorMessage = (
  _errors: any,
  _name: string,
  _customError: CustomError
): TypographyTitleTypes => {
  const _hasError = hasErrorInput(_errors, _name);
  const _hasCustomError = !_customError.validation ? _customError.message : '';

  return _hasError ? { value: _errors[_name].message } : _hasCustomError;
};

/**
 * Funcion que se encarga de crear los estilos dinanimos del componente.
 * @param param Props del component
 * @returns Regresa un nuevo objeto con las clases dinamicas para el componente
 */
export const generateDynamicStyles = ({
  type,
  name,
  template,
  iconName,
  color,
  stopLabelAnimation,
  disabled,
  errors,
  customError,
  spacingError,
  value
}: DynamicStylesProps): InputDynamicStylesReturn => {
  // Error messages
  const errorMessage = getErrorMessage(errors, name, customError);

  // Styles disabled
  const classesIconDisabled = disabled ? 'input__icon--disabled' : '';
  const classLabelDisabled = disabled ? 'input__label--disabled' : '';
  const colorIconDisabled = disabled
    ? 'gray-light'
    : isEmpty(errorMessage)
    ? color
    : 'error';

  // Body
  const classesBodyTemplate =
    template === 'baseline' ? 'input__body--baseline' : '';
  const classesBodyTextareaTemplate =
    template === 'outline'
      ? 'input__body--outline-textarea'
      : 'input__body--textarea';
  const classesBody =
    type === 'textarea' ? classesBodyTextareaTemplate : classesBodyTemplate;

  // Classes input
  const classBorderColor = disabled
    ? 'border-gray-lighter'
    : isEmpty(errorMessage)
    ? `border-${color}`
    : 'border-error';

  // Classes icon
  const classesIconTextareaTemplate =
    template === 'outline'
      ? 'input__icon--outline-textarea'
      : 'input__icon--textarea';
  const classesIconTeatarea =
    type === 'textarea' ? classesIconTextareaTemplate : '';
  const classesIcon = template === 'baseline' ? 'input__icon--baseline' : '';
  const classInputIcon = iconName ? 'input__field--has-icon' : '';
  const classInputIconBaseline =
    template === 'baseline' && iconName
      ? 'input__field--baseline--has-icon'
      : '';

  const _classesIcon = `${classesIcon} ${classesIconTeatarea}`;

  // Classes label
  const classInputLabelBaseline =
    template === 'baseline' ? 'input__label--baseline' : '';
  const classInputLabelBaselineIcon =
    template === 'baseline'
      ? 'input__label--baseline--has-icon'
      : 'input__label--has-icon';
  const classLabelIcon = iconName
    ? classInputLabelBaselineIcon
    : classInputLabelBaseline;
  const classTemplateLabel =
    template === 'baseline' ? 'input__label--stop' : '';

  // Estilos para el label
  const classActiveLabel =
    template === 'outline'
      ? !isEmpty(value) || stopLabelAnimation
        ? 'input__label--is-active'
        : ''
      : !isEmpty(value) || stopLabelAnimation
      ? 'input__label--is-active-stop'
      : '';

  // Classes error

  const classesWithError = spacingError ? 'input__error-message--enabled' : '';
  const classInputSpacing = template === 'baseline' ? 'input--baseline' : '';
  const classesErrorMessageBaseline =
    template === 'baseline' ? 'input__error-message--baseline' : '';
  const classesErrorMessageTextarea =
    type === 'textarea' ? 'input__error-message--textarea' : '';

  const classesFieldTextareaTemplate =
    type === 'textarea' && template === 'outline'
      ? 'input__field--outline-textarea'
      : '';

  const _classesErrorMessage = `${classesErrorMessageBaseline} ${classesErrorMessageTextarea}`;

  const classesLabel = `
    input__label
    ${classTemplateLabel}
    ${classLabelIcon}
    ${classLabelDisabled}
    ${classActiveLabel}
  `;

  const classesInput = `
    input__field
    input__field--${template}
    ${classesFieldTextareaTemplate}
    ${classBorderColor}
    ${classInputIcon}
    ${classInputIconBaseline}
  `;

  const classesLabelTextareaTemplate =
    template === 'outline'
      ? 'input__label--outline-textarea'
      : 'input__label--textarea';
  const _classesLabel =
    type === 'textarea'
      ? `${classesLabel} ${classesLabelTextareaTemplate}`
      : classesLabel;

  const _classesInput =
    type === 'password'
      ? `${classesInput} input__field--has-password`
      : classesInput;

  return {
    classesBody,
    classInputSpacing,
    classesWithError,
    classesLabel: _classesLabel,
    classesInput: _classesInput,
    classesIcon: _classesIcon,
    colorIconDisabled,
    classesIconDisabled,
    classesErrorMessage: _classesErrorMessage
  };
};
