import { useMemo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
// Routes
import { ROUTES } from '../../../routes';
// Components
import Button from '../../atoms/Buttons/Button';
// Types
import { NavigationProps } from './types';
// Styles
import './style.scss';

const Navigation = ({ isOpen, onClick }: NavigationProps) => {
  // Dynamic styles
  const activeClass = useMemo(
    () => (isOpen ? 'navigation--active' : 'navigation--inactive'),
    [isOpen]
  );

  /**
   * Funcion que maneja el evento click del boton y envia al componente padre
   * la ruta actual.
   */
  const handleOnClick = useCallback(
    (path: string) => () => {
      onClick(path);
    },
    [onClick]
  );

  return (
    <>
      {ROUTES.map((item) => {
        return (
          <li key={item.id} className={`navigation ${activeClass}-${item.id}`}>
            {item.path !== '-' ? (
              <NavLink
                to={item.path}
                className={({ isActive }) => {
                  const activeItem = isActive
                    ? 'text-primary'
                    : 'text-gray navigation__link-hover';
                  return `navigation__link ${activeItem}`;
                }}
                onClick={handleOnClick(item.path)}
              >
                {item.name}
              </NavLink>
            ) : (
              <Button
                size="small"
                title={{ value: 'buttons.logout' }}
                className="navigation__link navigation__link--small"
                onClick={handleOnClick(item.path)}
              />
            )}
          </li>
        );
      })}
    </>
  );
};

export default Navigation;
