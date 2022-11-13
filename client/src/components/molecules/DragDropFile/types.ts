export interface FileData {
  /** Id de archivo */
  id: number;
  /** Nombre del archivo */
  name: string;
  /** Peso del archivo */
  size: number;
  /** Tipo de archivo */
  type: string;
}

export interface FileList {
  /** Archivo */
  src: string;
  /** Propiedades del archivo */
  fileData: FileData;
}

export interface DragDropFileProps {
  /** Tipo de archivos que permite cargar el componente */
  acceptedFiles: string;
  /** Bandera que indica si se deben de limpiar los archivos */
  cleanFiles: boolean;
  /** Funcion callback que manda al padre todos los archivos cargados */
  onFilesLoaded(files: Array<FileList>): void;
}
