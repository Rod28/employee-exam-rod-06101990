import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// Constants
import { KEYWORD } from '../../../constants';
// Components
import Tag from './Tag';
// Helpers
import { getMessageTranslation } from '../MessageI18n/utils';
// Utils
import { generateDynamicHighlightText } from './utils';
// Types
import { TypographyProps } from './types';
// Styles
import './style.scss';

/**
 * Componente que renderiza condicionalmente uno de los siguintes elementos,
 * label o p, y maneja los estilos y atributos para pintar textos con i18next.
 */
const Typography = ({
  title,
  beforeTitle,
  afterTitle,
  weight,
  highlighters,
  highlightColor,
  highlightWeight,
  classNameHighlight,
  children,
  ...res
}: TypographyProps) => {
  // Translations
  const { t } = useTranslation();

  // Styles
  const currentWeight = highlightWeight || weight;
  const classesSpan = `
    typography__highlight
    font-weight-${currentWeight}
    text-${highlightColor}
    ${classNameHighlight}
  `;

  const text = useMemo(
    () => getMessageTranslation(children || title, t, beforeTitle, afterTitle),
    [afterTitle, beforeTitle, children, t, title]
  );

  const renderText = useMemo(
    () =>
      text.includes(KEYWORD)
        ? generateDynamicHighlightText(text, classesSpan, highlighters).map(
            (item) => item
          )
        : text,
    [text, classesSpan, highlighters]
  );

  // No renderiza el componente
  if (!title && !children) {
    return null;
  }

  return (
    <Tag {...res} weight={weight}>
      {renderText}
    </Tag>
  );
};

Typography.defaultProps = {
  variant: 'p',
  title: '',
  color: 'black',
  highlighters: [],
  highlightColor: 'black'
};

export default Typography;
