import { ReactNode } from 'react';
// Types
import { Colors } from '../../../interfaces/colors';
import { Weights, Sizes, Align } from '../../../interfaces/texts';
import { MessageProps, MessageTitleTypes } from '../MessageI18n/type';

export type TypographyTitleTypes = MessageTitleTypes;
export type Tag = 'p' | 'label';

export interface TypographyFeatures {
  /** Tipo de elemento a renderizar */
  variant: Tag;
  /** Atributo propio del elemento label */
  htmlFor?: string;
  /** Color del elemento a renderizar, label o p */
  color: Colors;
  /** Alineacion del elemento a renderizar, label o p */
  align?: Align;
  /** Peso del elemento a renderizar, label o p */
  weight?: Weights;
  /** Size del elemento a renderizar, label o p */
  size?: Sizes;
  /** Clases inyectadas para el elemento del componente, label o p */
  className?: string;
}

export interface TypographyProps extends TypographyFeatures, MessageProps {
  /** Arreglo de textos que se van a resaltar y sustituir con las coincidencias de <~> */
  highlighters: Array<string>;
  /** Color del elemento span */
  highlightColor: Colors;
  /** Peso del elemento span */
  highlightWeight?: Weights;
  /** Clases inyectadas para el elemento del componente, span */
  classNameHighlight?: string;
  /** Mensaje de tipo string o i18n que va a mostrar el componente */
  children?: MessageTitleTypes;
}

export interface TagProps extends TypographyFeatures {
  /** Elemento hijo dentro del componente */
  children: ReactNode;
}
