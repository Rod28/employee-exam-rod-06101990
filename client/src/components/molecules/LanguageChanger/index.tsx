import { useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import LocalStorage from 'local-storage-to-object';
// Components
import Button from '../../atoms/Buttons/Button';

/**
 * Componente que renderiza un boton, encargado de cambiar el idioma
 * de toda la aplicacion y almacenar el valor actual en localStorage.
 */
const LanguageChanger = () => {
  // Translation
  const { i18n } = useTranslation();

  // Nuevo idioma al que se va a cambiar.
  const newLenguage = useMemo(
    (): string => (i18n.language === 'es' ? 'en' : 'es'),
    [i18n.language]
  );

  /**
   * Funcion que se encarga de cambiar el idioma de toda la aplicacion.
   */
  const handleChangeLanguage = useCallback((): void => {
    // Persistimos la sesion en local storage para no perderla en caso de cargar.
    LocalStorage.setItem('Language', { language: newLenguage });

    i18n.changeLanguage(newLenguage);
  }, [i18n, newLenguage]);

  return (
    <Button
      size="small"
      title={newLenguage}
      startIcon="language"
      onClick={handleChangeLanguage}
      className="fixed top-5 right-4 z-50 p-2 w-20"
    />
  );
};

export default LanguageChanger;
