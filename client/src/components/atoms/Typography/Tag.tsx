import { useMemo, createElement } from 'react';
// types
import { TagProps } from './types';

const Tag = ({
  variant,
  htmlFor,
  color,
  align,
  weight,
  size,
  className,
  children
}: TagProps) => {
  // Se generar los props de los elementos
  const currentProps = useMemo(() => {
    let classes = 'typography';
    let _props: Record<string, string> = {};

    if (align) {
      classes += ` font-align-${align}`;
    }

    if (weight) {
      classes += ` font-weight-${weight}`;
    }

    if (size) {
      classes += ` font-size-${size}`;
    }

    if (color) {
      classes += ` text-${color}`;
    }

    if (className) {
      classes += ` ${className}`;
    }

    if (variant === 'label' && htmlFor) {
      _props.htmlFor = htmlFor;
    }

    _props.className = classes;

    return _props;
  }, [variant, htmlFor, color, align, weight, size, className]);

  return createElement(variant, currentProps, children);
};

export default Tag;
