// Types
import { Colors } from '../../../interfaces/colors';

export interface ButtonBurgerProps {
  /** Bandera que indica si el boton esta activo o no */
  isActive: boolean;
  /** Color de las lineas del botón hamburguesa */
  color: Colors;
  /** Color de las lineas del botón hamburguesa cuando este esta activado */
  activeColor?: Colors;
  /** Estilos inyectados del componente */
  className?: string;
  /** Callback que maneja el evento click desde el padre */
  onClick(): void;
}
