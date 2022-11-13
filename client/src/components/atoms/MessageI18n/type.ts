export type InterpolationOptions = {
  /** Formato de clave y valor que contienen las varable interpoladas al texto */
  [key: string]: string | { [key: string]: string };
};

export interface TranslationsConfig {
  /** Valor o arreglo de valors que puedo tomar el objeto i18n */
  value: string | Array<string>;
  /** Valor o valores de las variables que se pueden interpolar al texto */
  keys?: InterpolationOptions;
}

export type MessageTitleTypes = string | TranslationsConfig;

export interface MessageProps {
  /** Mensaje de tipo string o i18n que va a mostrar el componente */
  title: MessageTitleTypes;
  /** Texto antes del prop title */
  beforeTitle?: string;
  /** Texto despues del prop title */
  afterTitle?: string;
}
