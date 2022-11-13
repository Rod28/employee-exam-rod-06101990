import { useMemo, useEffect } from 'react';
import { Routes, useLocation } from 'react-router-dom';
// Context
import { useMenuStatus } from '../../context/MenuStatusProvider/context';
// Helpers
import { toScrollTop } from '../../helpers/utils';
// Types
import { RoutesMainProps } from './types';

const RoutesMain = ({ children }: RoutesMainProps) => {
  // Location
  const location = useLocation();

  // Context
  const {
    state: { menuState }
  } = useMenuStatus();

  // Dynamic styles
  const classActive = useMemo(
    () => (menuState ? 'main--active-menu' : 'main--inactive-menu'),
    [menuState]
  );

  /**
   * Hace un scroll al tope de la pantalla, cada vez que location cambia sus valores.
   */
  useEffect(() => {
    toScrollTop();
  }, [location]);

  return (
    <main className={`main ${classActive}`}>
      <Routes>{children}</Routes>
    </main>
  );
};

export default RoutesMain;
