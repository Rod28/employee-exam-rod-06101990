/**
 * Funcion que se encarga de llamar a preventDefault.
 * @param e Evento
 */
const preventDefault = (e: any): boolean => {
  e.preventDefault();
  return false;
};

/**
 * Funcion que detecta las teclas que el usuario presiona, si estas coinciden
 * con algun valor dentro de `keys`, se llama a preventDefault.
 * @param e Evento
 */
const preventDefaultForScrollKeys = (e: any): boolean => {
  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  const keys: Record<number, number> = {
    32: 1,
    33: 1,
    34: 1,
    35: 1,
    36: 1,
    37: 1,
    38: 1,
    39: 1,
    40: 1
  };

  if (keys[e.key]) {
    preventDefault(e);
    return false;
  }
  return true;
};

/**
 * Las versiones modernas de Chrome, requieren { passive: boolean } al agregar el evento.
 */
const getPassiveIfSupported = (): boolean => {
  // Bandera que indica si hay soporte para el objeto 'passive'.
  let passiveIfSupported: any = false;

  try {
    window.addEventListener(
      'test',
      () => {},
      Object.defineProperty({}, 'passive', {
        get: () => {
          passiveIfSupported = { passive: true };
          return false;
        }
      })
    );
  } catch {
    passiveIfSupported = false;
  }
  return passiveIfSupported;
};

/**
 * La función se encarga de deshabilitar el scroll del navegador.
 * Esta funcion tiene soporte para navegadores modernos, dispositivos tactiles y xal presionar ciertas teclas.
 */
export const disabledScroll = (): void => {
  // Implementacion para versiones modernas. ya que actualmente, mousewheel esta en desuso.
  const wheelEvent =
    'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  /**
   * Debido a que los navegadores más antiguos (así como algunos navegadores no demasiado antiguos)
   * aún asumen que el tercer parámetro es un valor booleano, se debe especificar 'false' si es que no hay
   * soporte para el objeto 'passive'.
   */
  const wheelOpt = !getPassiveIfSupported() ? false : { passive: false };

  window.addEventListener('DOMMouseScroll', preventDefault, false); // Older Firefox
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // Modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // Mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
};

/**
 * La función se encarga de habilitar el scroll del navegador.
 * Esta funcion tiene soporte para navegadores modernos, dispositivos tactiles y xal presionar ciertas teclas.
 */
export const enabledScroll = (): void => {
  // Implementacion para versiones modernas. ya que actualmente, mousewheel esta en desuso.
  const wheelEvent =
    'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

  window.removeEventListener('DOMMouseScroll', preventDefault, false); // Older Firefox
  window.removeEventListener(wheelEvent, preventDefault); // Modern desktop
  window.removeEventListener('touchmove', preventDefault); // Mobile
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
};

/**
 * La función hace un desplazamiento suave hacia un elemento. Este efecto es el
 * mismo que se realizaría con un ancla con el elemento <a>, pero ya que el ancla
 * coloca el id del elemento como parte del nombre de la ruta, se usa esta función
 * para evitar eso.
 *
 * La función recibe dos parametros, el primero es el elemento a mostrar
 * y el segundo es la posición donde se va a situar el elemento en la pantalla.
 * @param element Nombre del id del elemento hacia donde se hará el scroll
 * @param position Posición del elemento que se marcará como tope para el scroll
 */
export const viewAnchor = (
  element: string,
  position: 'center' | 'end' | 'nearest' | 'start'
): void => {
  const sectionView = document.querySelector(element);

  if (sectionView) {
    sectionView.scrollIntoView({ behavior: 'smooth', block: position });
  }
};

/**
 * Hace scroll al tope de la página del componente que la llame.
 */
export const toScrollTop = (): void => {
  if (window.scrollY) {
    window.scroll(0, 0);
  }
};
