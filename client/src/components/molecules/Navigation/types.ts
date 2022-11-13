export interface NavigationProps {
  /** Bandera que indica si el menu esta abierto o no */
  isOpen: boolean;
  /** Callback que maneja el evento click desde el padre */
  onClick(path: string): void;
}
