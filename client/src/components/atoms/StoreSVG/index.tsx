// Svgs
import SVGS from '../../../svg/createSvg';
// Types
import { StoreSVGProps } from './types';
// Styles
import './style.scss';

/**
 * Componente que va a renderizar el nombre del icono que coincida con
 * uno dentro del paquete de createSvg.
 * Si no coincide con ningún nombre, se renderiza un icono por defecto.
 */
const StoreSVG = ({ name, color }: StoreSVGProps) => {
  const iconDefault = 'default';
  const svg = SVGS.find((svg) => svg.name === name || svg.name === iconDefault);

  // El color siempre será 'warning' si no se encuentra el paquete del icono
  const classColor = svg?.name === iconDefault ? 'fill-error' : `fill-${color}`;

  return (
    <svg viewBox={svg?.icon?.viewBox} className={`svg ${classColor}`}>
      {svg?.icon?.svg}
    </svg>
  );
};

StoreSVG.defaultProps = {
  color: 'primary'
};

export default StoreSVG;
