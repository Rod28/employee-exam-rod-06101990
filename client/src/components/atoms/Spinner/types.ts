// Types
import { Colors } from '../../../interfaces/colors';

export type SpinnerTypes = 'bars' | 'ring' | 'core' | 'equalCore';

export interface SpinnerProps {
  /** Tipo de spinner a renderizar */
  type: SpinnerTypes;
  /** Color principal que toma el spinner */
  color: Colors;
  /** Color del circulo de en medio, solo para el spinner de tipo core */
  colorMiddle: Colors;
  /** Color del circulo del centro, solo para el spinner de tipo core */
  colorCenter: Colors;
  /** Bandera que indica si se muestra un spinner pequeño */
  isSmall?: boolean;
  /** Bandera que indica si se muestra o no el spinner */
  isLoading: boolean;
}
