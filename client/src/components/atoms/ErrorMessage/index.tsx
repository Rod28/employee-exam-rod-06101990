import { useMemo, useState, useEffect } from 'react';
// Components
import Typography from '../Typography';
// Types
import { ErrorMessageProps } from './types';
import { TypographyTitleTypes } from '../Typography/types';
// Styles
import './style.scss';

/**
 * Componente que renderiza un mensaje con estilos para manejo de errores.
 */
const ErrorMessage = ({ show, message, className }: ErrorMessageProps) => {
  // State
  const [currentMessage, setCurrentMessage] =
    useState<TypographyTitleTypes>(message);

  // Dynamic styles
  const showMessage = useMemo(
    () => (show ? 'error-message--open' : ''),
    [show]
  );

  /**
   * Se almacena el nuevo valor del mensaje en el state del componente solo
   * si el valor existe, de esta manera se evita que el mensaje se deje de mostrar
   * sin animacion.
   */
  useEffect(() => {
    const messageValue = typeof message === 'string' ? message : message?.value;
    messageValue && setCurrentMessage(message);
  }, [currentMessage, message]);

  return (
    <div className={`error-message  ${showMessage} ${className}`}>
      <Typography
        title={currentMessage}
        color="error"
        weight="semi-bold"
        size="small"
      />
    </div>
  );
};

ErrorMessage.defaultProps = {
  message: '-- Error message --'
};

export default ErrorMessage;
