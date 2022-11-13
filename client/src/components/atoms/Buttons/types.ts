// Types
import { Colors } from '../../../interfaces/colors';
import { Templates } from '../../../interfaces/templates';
import { MessageTitleTypes } from '../MessageI18n/type';

export type SizeTypes = 'big' | 'small';
export type ShapeTypes = 'edges' | 'dragee' | 'box';

export interface SubmitProps {
  /** Texto que muestra el botón */
  title: MessageTitleTypes;
  /** Estilo del botón */
  template?: Templates;
  /** Estilos inyectados del componente */
  className?: string;
  /** Texto descriptivo del botón, para SEO */
  ariaLabel?: string;
  /** Nombre del paquete del icono a mostrar antes del texto */
  startIcon?: string;
  /** Nombre del paquete del icono a mostrar despues del texto */
  endIcon?: string;
  /** Color del boton e icono */
  color: Colors;
  /** Color del texto e icono */
  textColor?: Colors;
  /** Tamaño que puede tomar el botón */
  size: SizeTypes;
  /** Forma que va a tomar el botón */
  shape: ShapeTypes;
  /** Bandera que indica si debe deshabilitar el botón */
  disabled: boolean;
}

export interface ButtonProps extends SubmitProps {
  /** Callback del evento onClick que maneja el padre */
  onClick(): void;
}

export interface Props {
  /** Texto descriptivo del botón, para SEO */
  'aria-label'?: string;
  /** Estilos inyectados del componente */
  className?: string;
  /** Bandera que indica si debe deshabilitar el botón */
  disabled: boolean;
}
export interface ButtonPropsReturn {
  /** Objeto con las clases para el componente button */
  buttonProps: Props;
  /** Clases unicamente para el startIcon */
  classStartIcon: string;
  /** Clases unicamente para el endIcon */
  classEndIcon: string;
  /** Estilos que contienen el color del texto */
  classColorIcon: Colors;
  /** Classe para el color del Ripple */
  currentColorRipple: Colors;
}
