import { useState, useMemo, useCallback, useEffect } from 'react';
// Components
import Typography from '../../atoms/Typography';
import Icon from '../../atoms/Icon';
// Utils
import { getInitialImage, goToChangeImage, getIndexFile } from './utils';
// Types
import { ImagePreviewProps, ChangeImageType } from './types';
// Styles
import './style.scss';

const ImagePreview = ({ isOpen, index, files, onClose }: ImagePreviewProps) => {
  // States
  const [currentImage, setCurrentImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState('');

  // Obtiene el numero de la imagen actual
  const currentNumberImage = useMemo(
    () =>
      getIndexFile(files, currentIndex) > -1
        ? getIndexFile(files, currentIndex) + 1
        : 0,
    [currentIndex, files]
  );

  // Animaciones para abrir la modal
  const classesOpenModal = isOpen ? 'image-preview--open' : '';
  const classesOpenBody = isOpen ? 'image-preview__body--open' : '';

  /**
   * Funcion que se encarga de cambiar a la imagen siguiente o anterios,
   * dependiendo del valor de 'type'.
   * @param type Tipo de cambio 'prev' | 'next'
   */
  const handleChangeImage = useCallback(
    (type: ChangeImageType): (() => void) =>
      (): void => {
        const newImage = goToChangeImage(files, currentIndex, type);
        setCurrentImage(newImage.src);
        setCurrentIndex(newImage.index);
      },
    [files, currentIndex]
  );

  /**
   * Cada vez que se abre la modal para mostrar el componente,
   * se actualiza la imagen actual y su identificador.
   */
  useEffect(() => {
    if (isOpen) {
      const newImage = getInitialImage(files, index);
      setCurrentIndex(index);
      setCurrentImage(newImage);
    }
  }, [isOpen, files, index]);

  // Si no existen archivos, el componente no se monta.
  if (!files.length) {
    return null;
  }

  return (
    <div className={`image-preview ${classesOpenModal}`}>
      {/* Close button */}
      <button className="image-preview__button-container" onClick={onClose}>
        <Icon name="close" className="image-preview__icon" />
      </button>

      <div className={`image-preview__body ${classesOpenBody}`}>
        <Typography
          title={`Imagen ${currentNumberImage} - ${files.length}`}
          size="large"
          weight="bold"
          className="mb-4"
          color="gray-lighter"
        />

        <div className="image-preview__card-container">
          <img src={currentImage} alt={files[0].fileData.name} />

          {/* Prev image */}
          {files.length > 1 && (
            <button
              className="image-preview__button-prev"
              onClick={handleChangeImage('prev')}
            >
              <Icon name="chevron-left" className="image-preview__icon" />
            </button>
          )}

          {/* Next image */}
          {files.length > 1 && (
            <button
              className="image-preview__button-next"
              onClick={handleChangeImage('next')}
            >
              <Icon name="chevron-right" className="image-preview__icon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
