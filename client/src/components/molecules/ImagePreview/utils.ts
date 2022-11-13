// Types
import { ChangeImageType, ChangeImageReturn } from './types';
import { FileList } from '../DragDropFile/types';

/**
 * La funcion obtiene la imagen con la que se abrio la modal a traves de su index.
 * @param _files Matriz de archivos
 * @param _index Indice de la imagen con la que se abre la modal
 * @returns Imagen con la que se abre la modal
 */
export const getInitialImage = (
  _files: Array<FileList>,
  _index: string
): string => {
  // Si uno de los parametros no existe, regresa un string vacio.
  if (!_files.length || !_index) {
    return '';
  }

  const copyFiles = [..._files];
  const findFile = copyFiles.filter((f) => `${f.fileData.id}` === _index);

  // Regresa la imagen que coincida con el _index.
  if (findFile && findFile.length) {
    return findFile[0].src;
  }

  // Regresa la primer imagen del arreglo de 'files'.
  return _files[0].src;
};

/**
 * La funcion obtiene el index del arreglo de la imagen a mostrar
 * @param _files Matriz de archivos
 * @param _currentIndex Indice de la imagen actual
 */
export const getIndexFile = (
  _files: Array<FileList>,
  _currentIndex: string
): number => {
  const copyFiles = [..._files];
  return copyFiles.findIndex((f) => `${f.fileData.id}` === _currentIndex);
};

/**
 * La funcion obtiene la nueva imagen e indice, siempre y cuando se invoque
 * un cambio hacia la imagen anterior o siguiente.
 * @param _files Matriz de archivos
 * @param _currentIndex Indice de la imagen actual
 * @param type Tipo de cambio 'prev' | 'next'
 */
export const goToChangeImage = (
  _files: Array<FileList>,
  _currentIndex: string,
  _type: ChangeImageType
): ChangeImageReturn => {
  // Si uno de los parametros no existe, regresa un string vacio.
  if (!_files.length || !_currentIndex) {
    return {
      index: '',
      src: ''
    };
  }

  const copyFiles = [..._files];
  const fileLength = copyFiles.length;
  const indexFile = getIndexFile(copyFiles, _currentIndex);

  // Solo si se encuentra el index se hace el calculo de la nueva imagen.
  if (indexFile > -1) {
    // Solo para el flujo de ir por la imagen anterior
    if (_type === 'prev') {
      const prevIndex = indexFile - 1;

      // Si ya nos encontramos en la primera imagen, nos manda a la ultima.
      if (prevIndex < 0) {
        return {
          index: copyFiles[fileLength - 1].fileData.id,
          src: copyFiles[fileLength - 1].src
        };
      }

      // Regresa datos de la imagen anterior
      return {
        index: copyFiles[prevIndex].fileData.id,
        src: copyFiles[prevIndex].src
      };
    }

    // Solo para el flujo de ir por la imagen siguiente
    if (_type === 'next') {
      const nextIndex = indexFile + 1;

      // Si ya nos encontramos en la ultima imagen, nos manda a la primera.
      if (nextIndex === fileLength) {
        return {
          index: copyFiles[0].fileData.id,
          src: copyFiles[0].src
        };
      }

      // Regresa datos de la imagen siguiente
      return {
        index: copyFiles[nextIndex].fileData.id,
        src: copyFiles[nextIndex].src
      };
    }
  }

  return {
    index: _files[0].fileData.id,
    src: _files[0].src
  };
};
