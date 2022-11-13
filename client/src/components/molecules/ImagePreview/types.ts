// Types
import { FileList } from '../DragDropFile/types';

export type ChangeImageType = 'prev' | 'next';

export interface ChangeImageReturn {
  /** Index de la nueva imagen a mostrar */
  index: string;
  /** Nueva imagen */
  src: string;
}

export interface ImagePreviewProps {
  /** Bandera que indica si se abre o no la modal */
  isOpen: boolean;
  /** Index actual sobre el que se van a empezar a mostrar las imagenes */
  index: string;
  /** Matriz que contiene todas las imagenes */
  files: Array<FileList>;
  /** Callback que cierra la modal desde el padre */
  onClose: () => void;
}
