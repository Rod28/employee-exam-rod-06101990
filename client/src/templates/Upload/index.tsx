import { useState, useCallback } from 'react';
// Context
import { useLoading } from '../../context/LoadingProvider/context';
import { useModal } from '../../context/ModalProvider/context';
// Components
import Button from '../../components/atoms/Buttons/Button';
import Typography from '../../components/atoms/Typography';
import DragDropFile from '../../components/molecules/DragDropFile';
// Helpers
import { sleep } from '../../helpers';
// Types
import { FileList } from '../../components/molecules/DragDropFile/types';

const Upload = () => {
  // Context
  const {
    actions: { setLoading }
  } = useLoading();
  const {
    actions: { openModalGlobal }
  } = useModal();

  // States
  const [files, setFiles] = useState<Array<FileList>>([]);
  const [cleanFiles, setCleanFiles] = useState(false);

  /**
   * Funcion encargada de simular la carga de los archivos a un servidor.
   */
  const handleSendFiles = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setCleanFiles(false);

      // Simula peticion al API
      await sleep(2000);

      setCleanFiles(true);
      openModalGlobal({
        type: 'successful',
        title: { value: 'modals.loadSimulation.title' },
        message: { value: 'modals.loadSimulation.message' }
      });
    } finally {
      setLoading(false);
    }
  }, [setLoading, openModalGlobal]);

  return (
    <div className="mt-10 mb-24">
      <Typography
        title={{ value: 'screens.upload.title' }}
        size="big"
        weight="bold"
        className="text-center uppercase leading-10"
        color="primary"
      />

      <div className="flex justify-center mt-10">
        <Button
          size="small"
          template="outline"
          endIcon="upload"
          disabled={!files.length}
          title={{ value: 'screens.upload.title' }}
          onClick={handleSendFiles}
        />
      </div>

      <DragDropFile
        acceptedFiles=".png, .jpeg, .jpg"
        cleanFiles={cleanFiles}
        onFilesLoaded={setFiles}
      />
    </div>
  );
};

export default Upload;
