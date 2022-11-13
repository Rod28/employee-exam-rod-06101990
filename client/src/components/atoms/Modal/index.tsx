// Components
import Typography from '../Typography';
import Button from '../Buttons/Button';
import Icon from '../Icon';
// Types
import { ModalProps } from './types';
// Styles
import './style.scss';

/**
 * Renderiza una modal personalizable que admite uno de los 3 estados, 'successful' o
 * 'warning' o 'error'.
 *
 * Cada uno de los 3 estados contiene un color de icono específico, al abrirse la modal,
 * se desactiva el scroll vertical de la app, y se reativa al cerrar la misma.
 */
const Modal = ({
  isOpen,
  type,
  title,
  message,
  textButton,
  closeModal
}: ModalProps) => {
  // Animaciones para abrir la modal
  const classesOpenModal = isOpen ? 'modal-notification--open' : '';
  const classesOpenBody = isOpen ? 'modal-notification__body--open' : '';

  return (
    <div className={`modal-notification ${classesOpenModal}`}>
      <div className={`modal-notification__body ${classesOpenBody}`}>
        <div className={`modal-notification__icon bg-${type}`}>
          <Icon name={type} color="white" />
        </div>

        {/* Content */}
        <Typography
          className="modal-notification__title"
          variant="p"
          title={title}
        />

        {message && (
          <Typography
            className="modal-notification__message"
            variant="p"
            title={message}
          />
        )}

        <div>
          <Button
            title={textButton ? textButton : { value: 'buttons.understood' }}
            color={type}
            size="small"
            template="outline"
            shape="dragee"
            onClick={closeModal}
          />
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  isOpen: false,
  type: 'successful',
  title: 'Titulo de Modal',
  message: 'Mensaje de Modal...'
};

export default Modal;
