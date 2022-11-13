import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
// Types
import { FormProps } from './types';

/**
 * Componente para controlar el estado, validaciones y envio de los inputs
 * @see https://react-hook-form.com/get-started#Quickstart
 */
const Form = ({
  mode,
  reValidateMode,
  className,
  children,
  onSubmit,
  onValid,
  onMethods
}: FormProps) => {
  // Todos los metodos disponibles en useForm
  const methods = useForm({
    mode,
    reValidateMode,
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false
  });

  /**
   * Manda al padre la validacion del formulario
   */
  useEffect(() => {
    onValid && onValid(methods.formState.isValid);
  }, [onValid, methods.formState.isValid]);

  /**
   * Manda al padre todos los metodos disponibles en useForm.
   * */
  useEffect(() => {
    onMethods && onMethods(methods);
  }, [onMethods, methods]);

  /**
   * Función que se encarga del evento onSubit del formulario una vez que todas
   * las validaciones pasan.
   * @param data Datos que el formulario va a mandar
   */
  const handleOnSubmit = (data: any) => onSubmit(data);

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(handleOnSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

Form.defaultProps = {
  mode: 'all',
  reValidateMode: 'onChange'
};

export default Form;
