import { useMemo } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import isEmpty from 'lodash/isEmpty';
// Components
import Icon from '../Icon';
import ErrorMessage from '../ErrorMessage';
import Typography from '../Typography';
// Rules
import { Rule_Required } from '../../../rules';
// Utils
import { hasErrorInput, getErrorMessage, generateDynamicStyles } from './utils';
// Types
import { BaseWrapperInputProps } from './types';
// Styles
import './style.scss';

/**
 * Renderiza un input customizado que puede ser de tipo text, email o password.
 */
const BaseWrapperInput = ({
  type,
  name,
  title,
  template,
  className,
  iconName,
  color,
  defaultValue,
  customError,
  hideError,
  stopLabelAnimation,
  isRequired,
  rules,
  disabled,
  renderInput,
  renderPasswordIcon
}: BaseWrapperInputProps) => {
  // React hook form
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const {
    field: { onChange, name: nameInput, value }
  } = useController({
    name,
    control,
    defaultValue,
    rules: isRequired ? { ...Rule_Required, ...rules } : rules
  });

  // Bandera que indica si hay que mostar un espacio inferior en el componente
  const spacingError = useMemo(
    () => !hideError && (!isEmpty(rules) || isRequired),
    [hideError, isRequired, rules]
  );

  // Condicion para mostrar el icono del cambio de estado del password
  const enabledIconPassword = useMemo(
    () => type === 'password' && !disabled,
    [disabled, type]
  );

  // Condicion para mostrar los errores
  const showError = useMemo(
    () => !disabled && !hideError,
    [disabled, hideError]
  );

  // Dynamic styles
  const {
    classesBody,
    classInputSpacing,
    classesWithError,
    classesInput,
    classesLabel,
    classesIcon,
    colorIconDisabled,
    classesIconDisabled,
    classesErrorMessage
  } = generateDynamicStyles({
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
  });

  return (
    <div className={`input ${classInputSpacing} ${className}`}>
      <div className={`input__body ${classesBody}`}>
        {/* Inputs */}
        {renderInput({
          nameInput,
          valueInput: value,
          disabledInput: disabled,
          classesInput: classesInput,
          onChangeInput: onChange
        })}

        {/* Title */}
        <Typography
          variant="label"
          title={title}
          afterTitle=":"
          htmlFor={nameInput}
          className={classesLabel}
          color="gray"
          weight="bold"
        />

        {/* Icon */}
        {iconName && (
          <Icon
            className={`input__icon ${classesIcon} ${classesIconDisabled}`}
            name={iconName}
            htmlFor={name}
            color={colorIconDisabled}
          />
        )}

        {/* Password's icon */}
        {enabledIconPassword && renderPasswordIcon && renderPasswordIcon()}
      </div>

      {/* Error message and custom error */}
      <ErrorMessage
        show={hasErrorInput(errors, nameInput) && showError}
        message={getErrorMessage(errors, nameInput, customError)}
        className={`input__error-message ${classesWithError} ${classesErrorMessage}`}
      />
    </div>
  );
};

export default BaseWrapperInput;
