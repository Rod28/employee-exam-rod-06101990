import { useState, useMemo, useCallback } from 'react';
// Routes
import { ROUTES } from '../../../routes';
// Context
import { useMenuStatus } from '../../../context/MenuStatusProvider/context';
import { useLoading } from '../../../context/LoadingProvider/context';
import { useAuth } from '../../../context/LoginProvider/context';
// Components
import ButtonBurger from '../../atoms/ButtonBurger';
import Navigation from '../../molecules/Navigation';
// Helpers
import { enabledScroll, disabledScroll } from '../../../helpers/utils';
import { sleep } from '../../../helpers';
// Styles
import './style.scss';

const Header = () => {
  // Context
  const {
    actions: { setMenuState }
  } = useMenuStatus();
  const {
    actions: { setLoading }
  } = useLoading();
  const {
    actions: { setHasAuth }
  } = useAuth();

  // State
  const [isActive, setIsActive] = useState(false);

  // Dynamic styles
  const classActiveMenu = useMemo(
    () => (isActive ? 'header__menu--active' : 'header__menu--inactive'),
    [isActive]
  );

  const classActiveBackdrop = useMemo(
    () =>
      isActive ? 'header__backdrop--active' : 'header__backdrop--inactive',
    [isActive]
  );

  const classButtonBurger = useMemo(
    () =>
      isActive
        ? 'header__button-burger--active'
        : 'header__button-burger--inactive',
    [isActive]
  );

  /**
   * Funcion que cambia el estado actual de isActive
   */
  const handleStatusChange = useCallback((): void => {
    const newValue = !isActive;

    // Habilita y deshabilita el scroll del navegador
    if (!newValue) {
      enabledScroll();
    } else {
      disabledScroll();
    }

    setMenuState(newValue);
    setIsActive(newValue);
  }, [isActive, setMenuState]);

  /**
   * Funcion que se encarga de cerrar el menu.
   * @param path Ruta a la que se le dio click
   */
  const handleCloseMenu = useCallback(
    async (path: string): Promise<void> => {
      if (path === ROUTES[2].path) {
        setLoading(true);

        setMenuState(false);
        setIsActive(false);

        // Habilita el scroll del navegador
        enabledScroll();

        await sleep(2000);

        setLoading(false);
        setHasAuth(false);
        return;
      }

      // Habilita el scroll del navegador
      enabledScroll();

      setMenuState(false);
      setIsActive(false);
    },
    [setMenuState, setLoading, setHasAuth]
  );

  return (
    <header className="header">
      <div
        className={`header__backdrop ${classActiveBackdrop}`}
        onClick={() => handleCloseMenu('')}
      />

      <ButtonBurger
        isActive={isActive}
        color="gray-light"
        activeColor="gray-dark"
        className={`header__button-burger ${classButtonBurger}`}
        onClick={handleStatusChange}
      />

      <div className={`header__menu ${classActiveMenu}`}>
        <nav className="header__navigation">
          <ul>
            <Navigation isOpen={isActive} onClick={handleCloseMenu} />
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
