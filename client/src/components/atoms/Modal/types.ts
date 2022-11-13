// Types
import { MessageTitleTypes } from '../MessageI18n/type';

export type ModalNotificationTypes = 'successful' | 'warning' | 'error';

export interface ModalProps {
  /** Renderiza uno de los tres tipos de iconos */
  type: ModalNotificationTypes;
  /** Titulo de la modal */
  title: MessageTitleTypes;
  /** Mensaje de la modal */
  message: MessageTitleTypes;
  /** Texto del botón */
  textButton?: MessageTitleTypes;
  /** Bandera que indica si se abre o no la modal */
  isOpen: boolean;
  /** Callback que cierra la modal desde el padre */
  closeModal: () => void;
}
