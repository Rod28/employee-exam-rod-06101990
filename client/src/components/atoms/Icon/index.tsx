// Components
import StoreSVG from '../StoreSVG';
// Types
import { IconProps } from './types';
// Styles
import './style.scss';

/**
 * Renderiza un icono y dependiendo de si existe o no el prop
 * 'isLabel' el elemento padre de este sera un div o un label.
 */
const Icon = ({
  name,
  color,
  htmlFor,
  className,
  isLabel,
  children
}: IconProps) => {
  return (
    <>
      {isLabel ? (
        <label htmlFor={htmlFor} className={`icon ${className}`}>
          <StoreSVG name={name} color={color} />
          {children}
        </label>
      ) : (
        <div className={`icon ${className}`}>
          <StoreSVG name={name} color={color} />
          {children}
        </div>
      )}
    </>
  );
};

Icon.defaultProps = {
  color: 'primary'
};

export default Icon;
