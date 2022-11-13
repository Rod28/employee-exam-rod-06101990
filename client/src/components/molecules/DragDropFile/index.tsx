import {
  useState,
  useCallback,
  useEffect,
  MouseEvent,
  ChangeEvent
} from 'react';
// Context
import { useModal } from '../../../context/ModalProvider/context';
// Components
import Icon from '../../../components/atoms/Icon';
import Typography from '../../../components/atoms/Typography';
// Types
import { DragDropFileProps, FileList } from './types';

const DragDropFile = ({
  acceptedFiles,
  cleanFiles,
  onFilesLoaded
}: DragDropFileProps) => {
  // Context
  const {
    actions: { openModalGlobal }
  } = useModal();

  // States
  const [files, setFiles] = useState<Array<FileList>>([]);
  const [currentId, setCurrentId] = useState('');

  /**
   * Funcion que se llama cada vez que se intenta cargar un nuevo archivo
   * en el input.
   * @param e Evento que contiene el archivo y s informacion
   * @param currentFiles Matriz con los archivos que se han cargado
   */
  const handleFileDrop = useCallback(
    (e: ChangeEvent<HTMLInputElement>, currentFiles: Array<FileList>): void => {
      const fls = e.target?.files;
      const newFile = fls ? fls[0] : undefined;

      // Se va a validar el archivo, solo si este existe
      if (newFile) {
        const allowedTypes = acceptedFiles.replaceAll('.', '');
        const type = newFile.type.split('/')[1];

        // Evita que se carguen archicos diferentes a los especificados en 'acceptedFiles'.
        if (!allowedTypes.includes(type)) {
          openModalGlobal({
            title: { value: 'modals.fileUploadError.title' },
            message: { value: 'modals.fileUploadError.message' }
          });
          return;
        }

        // Evitamos cargar archivos repetidos
        const repeatedFiles = currentFiles.filter(
          (file) => file.fileData.id === newFile.lastModified
        );
        if (repeatedFiles.length) {
          openModalGlobal({
            title: { value: 'modals.repeatedFiles.title' },
            message: { value: 'modals.repeatedFiles.message' }
          });
          return;
        }

        // Creamos los datos del nuevo archivo que se va a cargar
        const newData: FileList = {
          src: URL.createObjectURL(newFile as any),
          fileData: {
            id: newFile.lastModified,
            name: newFile.name,
            size: newFile.size,
            type: newFile.type
          }
        };

        const updateFiles: Array<FileList> = [...currentFiles, newData];
        setFiles(updateFiles);

        // Se mandan al componente padre, todos los archivos cargados
        onFilesLoaded(updateFiles);
      }
    },
    [acceptedFiles, onFilesLoaded, openModalGlobal]
  );

  /**
   * Funcion que se encarga de eliminar un archivo por su 'id'.
   * @param e Evento click del boton
   * @param id Id de la imagen a elimianr
   * @param currentFiles Matriz con los archivos que se han cargado
   */
  const handleRemoveFile = useCallback(
    (
      e: MouseEvent<HTMLButtonElement>,
      id: string,
      currentFiles: Array<FileList>
    ): void => {
      // Evitamos que el evento se propague al la funcion 'handlePreviewFile'.
      e.stopPropagation();

      let updateFiles: Array<FileList> = currentFiles;
      const filterFiles = currentFiles.filter(
        (file) => `${file.fileData.id}` !== id
      );

      // Obtenemos los nuevos archivos
      if (filterFiles) {
        updateFiles = filterFiles;
      }

      setFiles(updateFiles);
      setCurrentId('');

      // Se mandan al componente padre, el resto de archivos no eliminados
      onFilesLoaded(updateFiles);
    },
    [onFilesLoaded]
  );

  /**
   * Funcion que almacena el 'id' de la imagen seleccionada y la
   * abre en una modal para su vista previa.
   * @param id Id de la imagen seleccionada para la vista previa
   */
  const handlePreviewFile = useCallback((id: string): void => {
    setCurrentId(id);
  }, []);

  /**
   * Previene que si se hace click sobre el input file, se abra
   * el gestor de archivos del SO.
   * @param e Evento al hacer click sobre el input
   */
  const handlePreventOpenFileManager = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  /**
   * Se encarga de limpiar los archivos cuando 'cleanFiles' esta en true.
   */
  useEffect(() => {
    if (cleanFiles) {
      setFiles([]);
      setCurrentId('');
    }
  }, [cleanFiles]);

  return (
    <>
      <div className="w-11/12 md:w-4/5 max-w-screen-sm mx-auto h-56 xs:h-64 sm:h-80 mt-10">
        {/* Box */}
        <div className="h-full p-4 sm:p-8 rounded-xl shadow-2xl bg-gray-lighter">
          {/* Body input */}
          <div className="relative flex flex-col justify-center items-center h-full p-4 sm:p-8 border-4 border-dashed border-gray rounded-xl hover:opacity-50 duration-300 transition-opacity">
            <div className="flex flex-col justify-center items-center">
              <Icon
                name="upload"
                color="gray-light"
                className="w-6 xs:w-10 h-6 xs:h-10"
              />
              <Typography
                title={{ value: 'screens.upload.upload_title' }}
                size="large"
                weight="medium"
                className="w-4/5 pt-2 text-center leading-6 sm:leading-8"
                color="gray-light"
              />
            </div>

            <input
              type="file"
              name="file"
              className="absolute t-0 l-0 w-full h-full opacity-0"
              accept={acceptedFiles}
              onChange={(e) => handleFileDrop(e, files)}
              onClick={handlePreventOpenFileManager}
            />
          </div>
        </div>

        {/* Images list */}
        {files.length > 0 && (
          <>
            <Typography
              title={{ value: 'screens.upload.preview_title' }}
              size="medium"
              weight="medium"
              className="w-4/5 mt-20 mb-8 mx-auto text-center leading-5 sm:leading-7"
              color="gray-light"
            />

            <div className="flex flex-col items-center">
              {files.map((file) => {
                return (
                  <div
                    key={`${file.fileData.id}`}
                    className="relative flex justify-start w-full max-w-lg py-2 px-4 mb-4 rounded-lg bg-blue-100 hover:cursor-pointer"
                    onClick={() => handlePreviewFile(`${file.fileData.id}`)}
                  >
                    <Icon
                      name="image"
                      className="w-7 xs:w-10 h-7 xs:h-10 mr-6"
                    />
                    <div>
                      <Typography
                        title={file.fileData.name}
                        size="small"
                        className="leading-5"
                        color="gray"
                      />
                      <Typography
                        title={`${file.fileData.size}`}
                        size="small"
                        className="leading-5"
                        color="gray"
                      />
                      <Typography
                        title={file.fileData.type}
                        size="small"
                        className="leading-5"
                        color="gray"
                      />
                    </div>

                    <button
                      className="absolute top-3 right-3 z-50 w-5 h-5"
                      onClick={(e) =>
                        handleRemoveFile(e, `${file.fileData.id}`, files)
                      }
                    >
                      <Icon name="close" className="w-full h-full" />
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Images preview */}
        {/* TODO: Agregar ImagePreview */}
        <p>{currentId}</p>
      </div>
    </>
  );
};

export default DragDropFile;
