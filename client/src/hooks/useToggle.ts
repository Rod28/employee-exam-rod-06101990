import { useState, useCallback } from 'react';

/**
 * The Hook response supports both array and object destructing
 */
type useToggleTypesReturn = [boolean, () => void, () => void] & {
  toggle: boolean;
  toggleChange: () => void;
  toggleOff: () => void;
};

/**
 * Custom hook encargado de manejar el estado de una bandera para activar
 * o desactivar la misma.
 * @param initialValue Valor inicial de la bandera
 */
const useToggle = (initialValue = false): useToggleTypesReturn => {
  const [toggle, setToggle] = useState(initialValue);

  /**
   * Función que se encarga de cambiar al valor opuesto en el que se encuentra toggle.
   */
  const toggleChange = useCallback((): void => {
    setToggle((t) => !t);
  }, []);

  /**
   * Función que se encarga de cambiar a false el valor de toggle.
   */
  const toggleOff = useCallback((): void => {
    setToggle(false);
  }, []);

  const result = [toggle, toggleChange, toggleOff] as useToggleTypesReturn;

  // Support object destructuring, by adding the specific values.
  result.toggle = result[0];
  result.toggleChange = result[1];
  result.toggleOff = result[2];

  return result;
};

export default useToggle;
