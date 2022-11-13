import { ReactNode } from 'react';

export interface FallbackProps {
  /** Bandera que indica si el componente va a renderizar un componente en el fallback */
  withFallback: boolean;
  /** Bandera que indica si el componente debe ocupar todo el alto de la pantalla */
  isFull: boolean;
}

export interface FallbackLazyLoadingProps extends FallbackProps {
  /** Elemento hijo dentro del componente */
  children: ReactNode;
}
