export interface AddEmployeeProps {
  /** Bandera que indica si se abre o no la modal */
  isOpen: boolean;
  /** Callback que cierra la modal desde el componente padre */
  onCloseModal: () => void;
  /** Callback que continua el proceso de la modal desde el componente padre */
  onContinue: (values: Record<string, string>) => void;
}
