import { useTranslation } from 'react-i18next';
// Utils
import { getMessageTranslation } from './utils';
// Types
import { MessageProps } from './type';

/**
 * El componente recibe un texto o un objeto de tipo i18n, para poder regresar
 * unicamente el texto sin elemento jsx.
 * @param message Mensaje de tipo string o i18n que va a mostrar el componente
 * @see https://www.i18next.com/
 */
const MessageI18n = ({ title, beforeTitle, afterTitle }: MessageProps) => {
  // Translations
  const { t } = useTranslation();

  return <>{getMessageTranslation(title, t, beforeTitle, afterTitle)}</>;
};

MessageI18n.defaultProps = {
  title: '',
  beforeTitle: '',
  afterTitle: ''
};

export default MessageI18n;
