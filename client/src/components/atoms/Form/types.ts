import { ReactNode } from 'react';
import { Mode, UseFormReturn } from 'react-hook-form';

export interface FormProps {
  /** Modo para comenzar las validaciones en el formulario */
  mode: Mode;
  /** Modo para volver a validar el campo */
  reValidateMode: Exclude<Mode, 'onTouched' | 'all'>;
  /** Estilos inyectados del componente */
  className?: string;
  /** Elemento hijo dentro del componente */
  children: ReactNode;
  /** Callback que maneja el evento submit del formulario */
  onSubmit(data: any): void;
  /** Callback que manda al padre la validacion del formulario */
  onValid?(valid: boolean): void;
  /** Callback que manda al padre todos los metodos disponibles en useForm */
  onMethods?(methods: UseFormReturn): void;
}
