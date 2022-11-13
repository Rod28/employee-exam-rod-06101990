// Types
import { SubmitProps, Props, ButtonPropsReturn } from './types';

/**
 * Funcion que se encarga de crear los estilos dinanimos del componente
 * Button y Submit
 * @param param Props del component Button o Submit
 * @returns Regresa un nuevo objeto con las clases dinamicas para el componente
 */
export const generateDynamicStyles = ({
  title,
  className,
  template,
  ariaLabel,
  color,
  textColor,
  size,
  shape,
  disabled
}: SubmitProps): ButtonPropsReturn => {
  // Camabia el color del texto si existe un template de botón
  const baseColor = color === 'white' ? 'text-black' : 'text-white';
  const templateColor = template && color ? `text-${color}` : baseColor;
  const currentColor = textColor ? `text-${textColor}` : templateColor;
  const classColorText = disabled ? 'text-gray' : currentColor;

  const baseColorIcon = color === 'white' ? 'black' : 'white';
  const templateColorIcon = template && color ? color : baseColorIcon;
  const currentColorIcon = textColor ? textColor : templateColorIcon;
  const classColorIcon = disabled ? 'gray-light' : currentColorIcon;

  // Backgrounds style
  const classBackgroundColor = !template
    ? disabled
      ? 'bg-gray-light'
      : `bg-${color}`
    : '';
  // Borders style
  const classBorderColor =
    template !== 'text' ? (disabled ? 'border-gray' : `border-${color}`) : '';
  // Disabled icon style
  const classIconDisabled = disabled ? 'button__icon--disabled' : '';

  // Classes group
  const classesButtonText = `
    button
    button--${template}
    button--${size}
    button--${shape}
    ${classColorText}
    ${classBackgroundColor}
    ${classBorderColor}
    ${className}
  `;
  const classesButtonIcon = `
    button
    button__icon
    button__icon--${size}
    button__icon--${shape}
    button--${template}
    ${classColorIcon}
    ${classBackgroundColor}
    ${classBorderColor}
    ${classIconDisabled}
    ${className}
  `;

  // Agrega los props del elemento button
  let buttonProps: Props = {
    'aria-label': ariaLabel,
    disabled
  };

  if (title) {
    buttonProps.className = classesButtonText;
  }

  // Agrega las clases que necesita el componente Icon
  const classStartIcon = title
    ? 'button__has-icon button__has-icon--left'
    : classesButtonIcon;
  const classEndIcon = 'button__has-icon button__has-icon--right';

  // Color del elemento Ripple
  const currentColorRipple = color === 'black' ? 'white' : 'black';

  return {
    buttonProps,
    classStartIcon,
    classEndIcon,
    classColorIcon,
    currentColorRipple
  };
};
