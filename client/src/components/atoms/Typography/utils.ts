import { createElement, ReactNode } from 'react';
// Constants
import { KEYWORD } from '../../../constants';

/**
 * La funcion busca dentro de una cadena de texto, si existen coincidencias con una palabra clave (<~>),
 * y todas estas coincidencias las va a reemplazar por un elemento 'span' por cada una de las palabras
 * que se encuentren dentro de 'highlighters'.
 * Estas palabras seran reemplazadas en el orden en que vienen.
 *
 * @param text Texto que se va a renderizar, puede o no contener las palabras clave
 * @param classes Clases que se van a aplicar al elemento 'span'
 * @param highlighters Arreglo de palabras a reemplazar
 * @param textMap Arreglo que va almacenando el resutado
 * @param iteration Numero de iteraciones de la funcion, se usa como 'key' del span
 * @returns Arreglo con el contenido 'text' y elementos 'span' que reemplazan a las palabras clave.
 */
export const generateDynamicHighlightText = (
  text: string,
  classes: string,
  highlighters: Array<string>,
  textMap: Array<string | ReactNode> = [],
  iteration = 0
): Array<string | ReactNode> => {
  const words = textMap;
  const KeywordStartIndex = text.indexOf(KEYWORD);

  if (KeywordStartIndex < 0) {
    if (text) {
      words.push(text);
    }
    return words;
  }

  const firstWords = text.substring(0, KeywordStartIndex);
  const remainingRext = text.slice(KeywordStartIndex + KEYWORD.length);
  const highlightedWord = highlighters[iteration] || '[TEXT NOT FOUND]';

  words.push(
    firstWords,
    createElement(
      'span',
      { className: classes, key: iteration },
      highlightedWord
    )
  );

  return generateDynamicHighlightText(
    remainingRext,
    classes,
    highlighters,
    words,
    iteration + 1
  );
};
