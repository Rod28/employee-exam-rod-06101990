import { useMemo } from 'react';
// Types
import { ButtonBurgerProps } from './types';
// Styles
import './style.scss';

/**
 * El componente crea un boton de hamburguesa que se anima y cambia de forma
 * dependiendo del valor de "isActive", además controla la visivilidad del menu
 * en movil y tablet.
 */
const ButtonBurger = ({
  isActive,
  color,
  activeColor,
  className,
  onClick
}: ButtonBurgerProps) => {
  // Dynamic styles
  const classActive = useMemo(
    () => (isActive ? 'burger__line--active' : ''),
    [isActive]
  );

  const classColor = useMemo(
    () => (isActive && activeColor ? `text-${activeColor}` : `text-${color}`),
    [activeColor, color, isActive]
  );

  return (
    <button
      aria-label="Botón para interactuar con el menu móvil"
      className={`burger ${classColor} ${className}`}
      onClick={onClick}
    >
      <span className={`burger__line ${classActive}`} />
    </button>
  );
};

ButtonBurger.defaultProps = {
  color: 'white'
};

export default ButtonBurger;
