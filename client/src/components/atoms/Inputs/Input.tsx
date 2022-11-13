import {
  useRef,
  useState,
  useMemo,
  useCallback,
  MouseEvent,
  KeyboardEvent,
  ClipboardEvent
} from 'react';
// Components
import BaseWrapperInput from './BaseWrapperInput';
import Icon from '../Icon';
// Custom hooks
import useToggle from '../../../hooks/useToggle';
// Types
import { InputProps, RenderInputProps } from './types';
// Default props
import { defaultProps } from './defaultProps';
// Styles
import './style.scss';

/**
 * Renderiza un input customizado que puede ser de tipo text, email o password.
 */
const Input = ({
  type,
  autoFocus,
  maxLength,
  onValue,
  isPreventCopy,
  isPreventPaste,
  ...resProps
}: InputProps) => {
  // Custom hooks
  const [toggle, toggleChange] = useToggle();

  // Ref únicamente para el input de tipo password
  const refInputPassword = useRef<HTMLInputElement>(null);

  // State
  const [currentType, setCurrentType] = useState(type);

  // Cambia el estado para ver u ocultar la contraseña
  const iconPass = useMemo(() => (toggle ? 'show' : 'hide'), [toggle]);

  /**
   * Función que detecta el valor del input cada que se escribe en el.
   * @param e Evento del campo input
   * @param _onChangeInput Funcion onChange para cambiar el valor del input
   */
  const handleOnChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      _onChangeInput: (v: string) => void
    ): void => {
      const currentName = e.target.name;
      const currentValue = e.target.value;

      _onChangeInput(currentValue);
      onValue && onValue(currentName, currentValue);
    },
    [onValue]
  );

  /**
   * Esta función cambia el input de password a texto y viceversa.
   * De igual manera cambia el icono que se muestra, para indicar que
   * se puede mostrar u ocultar la contraseña.
   * * @param e Evento del boton
   */
  const handleToggleIconPass = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      e.preventDefault();

      if (refInputPassword.current) {
        if (refInputPassword.current.type === 'password') {
          setCurrentType('text');
        } else {
          setCurrentType('password');
        }

        // Cambia el estado de avtivo a inactivo del icono eye.
        toggleChange();
      }
    },
    [toggleChange]
  );

  /**
   * Funcion que evita que el input detone el comportamiento del boton en password.
   * @param e Evento del componente input
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && type === 'password') {
      e.preventDefault();
    }
  };

  /**
   * Funcion que evita que se copie en el input
   * @param e Evento del componente input
   */
  const handlePreventCopy = useCallback(
    (e: ClipboardEvent<HTMLInputElement>): void => {
      isPreventCopy && e.preventDefault();
    },
    [isPreventCopy]
  );

  /**
   * Funcion que evita que se pegue en el input
   * @param e Evento del componente input
   */
  const handlePreventPaste = useCallback(
    (e: ClipboardEvent<HTMLInputElement>): void => {
      isPreventPaste && e.preventDefault();
    },
    [isPreventPaste]
  );

  return (
    <BaseWrapperInput
      {...resProps}
      type={type}
      renderInput={(props: RenderInputProps) => (
        <input
          autoComplete="off"
          ref={refInputPassword}
          type={currentType}
          autoFocus={autoFocus}
          maxLength={maxLength}
          onChange={(v) => handleOnChange(v, props.onChangeInput)}
          // BaseWrapperInput props
          id={props.nameInput}
          name={props.nameInput}
          value={props.valueInput}
          className={props.classesInput}
          disabled={props.disabledInput}
          onKeyDown={handleKeyDown}
          onCopy={handlePreventCopy}
          onPaste={handlePreventPaste}
        />
      )}
      renderPasswordIcon={() => (
        <button
          tabIndex={-1}
          className="input__eye"
          onClick={handleToggleIconPass}
        >
          <Icon name={iconPass} color="gray" />
        </button>
      )}
    />
  );
};

Input.defaultProps = {
  ...defaultProps,
  type: 'text'
};

export default Input;
