import { useState, useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
// Components
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Buttons/Button';
import Submit from '../../atoms/Buttons/Submit';
import Input from '../../atoms/Inputs/Input';
import Form from '../../atoms/Form';
// Rules
import { Rule_NewEmployee } from '../../../rules';
// Types
import { AddEmployeeProps } from './types';
// Styles
import './style.scss';

const AddEmployee = ({
  isOpen,
  onCloseModal,
  onContinue
}: AddEmployeeProps) => {
  // States
  const [methods, setMethods] = useState<UseFormReturn>();

  // Animaciones para abrir la modal
  const classesOpenModal = isOpen ? 'add-employee--open' : '';
  const classesOpenBody = isOpen ? 'add-employee__body--open' : '';

  /**
   * Funcion que se encarga limpiar todos los datos del formulario.
   */
  const handleCleanForm = useCallback(async (): Promise<void> => {
    methods && methods.setValue('name', '');
    methods && methods.setValue('lastName', '');
    methods && methods.setValue('dateBirth', '');
    methods && (await methods.trigger(['name', 'lastName', 'dateBirth']));
    methods && methods.clearErrors(['name', 'lastName', 'dateBirth']);
  }, [methods]);

  /**
   * Funcion que se encarga de cancelar y cerrar la modal.
   */
  const handleCancel = useCallback((): void => {
    handleCleanForm();
    onCloseModal();
  }, [handleCleanForm, onCloseModal]);

  /**
   * Funcion que se encarga de enviar los datos del formulario al componente padre.
   * @param data Datos del formulario
   */
  const handleContinue = useCallback(
    (data: Record<string, string>): void => {
      handleCleanForm();
      onContinue(data);
    },
    [handleCleanForm, onContinue]
  );

  return (
    <div className={`add-employee ${classesOpenModal}`}>
      <div className={`add-employee__body ${classesOpenBody}`}>
        {/* Content */}
        <Typography
          className="add-employee__title"
          align="center"
          title={{ value: 'buttons.addEmployee' }}
        />
        {/* Form */}
        <Form onMethods={setMethods} onSubmit={handleContinue}>
          <Input
            stopLabelAnimation
            name="name"
            title={{ value: 'inputs.name' }}
            maxLength={30}
            rules={Rule_NewEmployee}
            isRequired
          />
          <Input
            stopLabelAnimation
            name="lastName"
            title={{ value: 'inputs.lastName' }}
            maxLength={30}
            rules={Rule_NewEmployee}
            isRequired
          />
          <Input
            stopLabelAnimation
            type="date"
            name="dateBirth"
            title={{ value: 'inputs.dateBirth' }}
            maxLength={8}
            isRequired
          />

          {/* Button */}
          <div className="flex flex-col mt-6">
            <Submit
              title={{ value: 'buttons.continue' }}
              size="small"
              template="outline"
              shape="dragee"
              color="successful"
              className="add-employee__button"
            />

            <Button
              title={{ value: 'buttons.cancel' }}
              size="small"
              template="outline"
              shape="dragee"
              color="gray"
              className="add-employee__button"
              onClick={handleCancel}
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddEmployee;
