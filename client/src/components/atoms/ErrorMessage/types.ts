// Types
import { TypographyTitleTypes } from '../Typography/types';

export interface ErrorMessageProps {
  /** Bandera que indica si se muestra o no el mensaje */
  show: boolean;
  /** Mensaje que va a mostrar el componente */
  message: TypographyTitleTypes;
  /** Estilos inyectados del componente */
  className?: string;
}
