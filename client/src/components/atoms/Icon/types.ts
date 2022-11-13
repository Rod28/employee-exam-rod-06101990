import { ReactNode } from 'react';
// Types
import { StoreSVGProps } from '../StoreSVG/types';

export interface IconProps extends StoreSVGProps {
  /** Id con que se liga el label con el input */
  htmlFor?: string;
  /** Clases inyectadas para el componente */
  className?: string;
  /** Texto del label */
  isLabel?: boolean;
  /** Componente hijo a renderizar */
  children?: ReactNode;
}
