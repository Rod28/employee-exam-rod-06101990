import { useMemo, useCallback } from 'react';
import NumberFormat, { NumberFormatValues } from 'react-number-format';
import isEmpty from 'lodash/isEmpty';
// Components
import BaseWrapperInput from './BaseWrapperInput';
// Helpers
import { createFormatPhone } from '../../../helpers';
import { isValidMaxLength } from '../../../helpers/validations';
// Types
import { NumericProps, RenderInputProps } from './types';
// Default props
import { defaultProps } from './defaultProps';
// Styles
import './style.scss';

/**
 * Renderiza un input customizado que puede ser de tipo tel o number.
 * @see https://github.com/s-yadav/react-number-format
 */
const Numeric = ({
  type,
  autoFocus,
  maxLength,
  onValue,
  allowNegative,
  allowEmptyFormatting,
  format,
  ...resProps
}: NumericProps) => {
  // Condicion que determina que tipo va a renderizar el input
  const currentType = useMemo(() => (type === 'tel' ? type : 'text'), [type]);

  /**
   * Función que detecta el valor del input cada que se escribe en el.
   * @param _value Valores que regresa 'react-number-format'
   * @param _name Nombre del input
   * @param _onChangeInput Funcion onChange para cambiar el valor del input
   */
  const handleOnChange = useCallback(
    (
      _value: NumberFormatValues,
      _name: string,
      _onChangeInput: (v: string) => void
    ): void => {
      const currentValue = _value.value;

      _onChangeInput(currentValue);
      onValue && onValue(_name, currentValue);
    },
    [onValue]
  );

  /**
   * Función que recibe un valor y lo analiza para determinar si se permite seguir escribiendo
   * en el input o no.
   * @param v Valores que regresa 'react-number-format'
   * @returns Bandera que indica si se permite seguir escribiendo en el input o no.
   */
  const handleAllowedValue = useCallback(
    (v: NumberFormatValues): boolean => {
      return isValidMaxLength(v.value, maxLength);
    },
    [maxLength]
  );

  return (
    <BaseWrapperInput
      {...resProps}
      type={type}
      renderInput={(props: RenderInputProps) => (
        <NumberFormat
          autoComplete="off"
          type={currentType}
          autoFocus={autoFocus}
          // BaseWrapperInput props
          id={props.nameInput}
          name={props.nameInput}
          value={props.valueInput}
          className={props.classesInput}
          disabled={props.disabledInput}
          // Only NumberFormat props
          decimalScale={0}
          onValueChange={(v: NumberFormatValues) =>
            handleOnChange(v, props.nameInput, props.onChangeInput)
          }
          allowNegative={allowNegative}
          allowEmptyFormatting={
            (type === 'tel' && isEmpty(props.valueInput)) ||
            isEmpty(props.valueInput)
              ? false
              : allowEmptyFormatting
          }
          format={type === 'tel' ? createFormatPhone(props.valueInput) : format}
          isAllowed={handleAllowedValue}
        />
      )}
    />
  );
};

Numeric.defaultProps = {
  ...defaultProps,
  allowNegative: false,
  allowEmptyFormatting: true,
  maxLength: 10
};

export default Numeric;
