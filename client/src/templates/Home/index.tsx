import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// Constants
import { LOGIN_CREDENTIALS } from '../../constants/login';
// Context
import { useLoading } from '../../context/LoadingProvider/context';
import { useModal } from '../../context/ModalProvider/context';
import { useAuth } from '../../context/LoginProvider/context';
// Components
import Submit from '../../components/atoms/Buttons/Submit';
import Typography from '../../components/atoms/Typography';
import Form from '../../components/atoms/Form';
import Input from '../../components/atoms/Inputs/Input';
// Helpers
import { sleep } from '../../helpers';

const Home = () => {
  // Navigation
  const navigate = useNavigate();

  // Contexts
  const {
    actions: { setLoading }
  } = useLoading();
  const {
    actions: { openModalGlobal }
  } = useModal();
  const {
    actions: { setHasAuth }
  } = useAuth();

  /**
   * Funcion que se encarga de simular un logion exitoso, o erroneo en
   * en caso de que las credenciales no coincidan.
   */
  const handleSubmit = useCallback(
    async (data: any): Promise<void> => {
      try {
        setLoading(true);

        // Simula peticion al API
        await sleep(2000);

        // Simula un error al no hacer coincidir las contraseñas
        if (
          data.user !== LOGIN_CREDENTIALS.User ||
          data.password !== LOGIN_CREDENTIALS.Pass
        ) {
          // Error sintetico al hacer login
          throw new Error();
        }

        // Login exitoso
        setHasAuth(true);
        navigate('/employees', { replace: true });
      } catch {
        setLoading(false);
        openModalGlobal({
          title: { value: 'modals.errorLogin.title' },
          message: { value: 'modals.errorLogin.message' }
        });
      }
    },
    [navigate, openModalGlobal, setLoading, setHasAuth]
  );

  return (
    <div className="w-4/5 sm:w-2/3 md:w-1/2 max-w-xl mt-10 mx-auto p-8 rounded-lg bg-gray-lighter">
      <Typography
        title={{ value: 'screens.home.title' }}
        size="big"
        weight="bold"
        className="text-center uppercase leading-10"
        color="primary"
      />
      <Form onSubmit={handleSubmit}>
        <Input
          autoFocus
          isPreventCopy
          isPreventPaste
          name="user"
          title={{ value: 'inputs.user' }}
          iconName="user"
          maxLength={15}
          isRequired
        />

        <Input
          isPreventCopy
          isPreventPaste
          type="password"
          name="password"
          title={{ value: 'inputs.password' }}
          iconName="pass"
          maxLength={15}
          isRequired
        />

        <div className="mt-5 text-center">
          <Submit
            size="small"
            template="outline"
            title={{ value: 'buttons.login' }}
          />
        </div>
      </Form>
    </div>
  );
};

export default Home;
